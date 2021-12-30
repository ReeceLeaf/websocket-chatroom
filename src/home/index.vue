<template>
  <div class="container">
    <div class="navbar">
      <div v-if="roomOpen" class="back" @click="back">返回</div>
      <div class="title">{{ title }}</div>
    </div>
    <div v-if="!roomOpen"  class="openBg">
      <div class="userInfo">
        <div v-if="!nickname" class="nameInputBox">
          <input type="text" class="nameInput" v-model="inputname" placeholder="请输入昵称" @keydown="nameKeydown" />
          <div class="nameConfirmBtn" @click="certainName">确认</div>
        </div>
        <div v-else class="nickname">昵称：{{ nickname }}</div>
      </div>
      <div class="cardList">
        <div class="itemCard" @click="enterRoom(item)" v-for="(item, i) in roomList" :key="i">
          <img class="pic" :src="item.frame">
          <span class="text">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div v-else class="bgImage" >
      <div class="roomInfo">
        <div class="onLineBox">
          昵称：<span class="roomNickname">{{ this.nickname }}</span>
          在线人数：{{ this.onlineNum }}
        </div>
      </div>
      <div class="msgBox" ref="msgWrap" @scroll="listScroll">
        <div class="msgPanel" ref="msgList">
          <div :class="['msgItem', item.self && 'selfItem']" v-for="(item, i) in msgList" :key="i">
            <span v-if="!item.self && item.name" style="font-weight: 500; font-size: 15px;color: #1d688c">{{ item.name }} : </span>
            <span :style="{ color: currentRoomInfo.msgColor }">{{ item.content }}</span>
            <span v-if="item.self" style="font-weight: 500; font-size: 15px; color: #1d688c"> : 我</span>
          </div>
        </div>
      </div>
      
      <div class="msgFooter">
        <input class="msgInput" type="text" v-model="inputMsg" placeholder="请输入发言内容" @keydown="sendInputKeydown" />
        <div class="msgBtn" @click="sendMsg">发言</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import smoothscroll from 'smoothscroll-polyfill'
import { debounce } from 'lodash'
import { roomList } from './config'
import { isScrollBottom } from '@/common/util.js'

smoothscroll.polyfill()

export default {
  name: 'home',
  data () {
    return {
      nickname: '',
      inputname: '',
      userId: '',
      roomList,
      msgList: [],
      roomOpen: false,
      ws: null,
      onlineNum: 0,
      inputMsg: '',
      currentRoomInfo: 0,
      heartbeatTimer: -1,
      heartBeatTimeoutJob: -1,
      msgWrapRef: null,
      scrollIsBottom: true,
      wrapperHeight: 0,
      isBindScrolled: false,
      isSending: false,
      msgListRef: null,
      scrollBottomTimeId: null,
    }
  },
  computed: {
    title() {
      return this.roomOpen ? this.currentRoomInfo.name : '首页'
    },
  },  
  watch: {
    msgList: {
      deep: true,
      handler() {
        this.msgChange()
      },
    },
    roomOpen(val) {
      if (val) {
        this.$nextTick(() => {
          this.msgWrapRef = this.$refs.msgWrap
          this.msgListRef = this.$refs.msgList
          this.wrapperHeight = this.msgWrapRef.offsetHeight
        })
      }
    },
  },
  mounted() {
    
  },
  methods: {
    enterRoom (item) {
      if (!this.nickname) return Toast('先起个好听的名字吧～')
      this.navbarProps = { ...this.navbarProps, title: item.name }
      this.currentRoomInfo = item

      this.connect()
      console.log('before open', this.ws.readyState)

      this.ws.onopen = () => {
        console.log('onopen', this.ws.readyState)
        this.roomOpen = true
        this.ws.send(JSON.stringify({
          userId: this.userName,
          userName: this.nickname,
          roomId: item.roomId,
          roomName: item.name,
          event: 'login',
        }))

        // 心跳定时器逻辑
        if (this.heartbeatTimer !== -1) {
          clearInterval(this.heartbeatTimer)
          this.heartbeatTimer = -1
        }
        this.heartbeatTimer = setInterval(() => {
          if (this.heartBeatTimeoutJob !== -1) {
            clearTimeout(this.heartBeatTimeoutJob)
            this.heartBeatTimeoutJob = -1
          }
          this.heartBeatTimeoutJob = setTimeout(() => {
            console.log('心跳超时')
            // 需要重连
          }, 10000)

          this.ws.send(JSON.stringify({
            event: 'heartBeat',
            content: 'ping',
          }))
          console.log('send ping')
        }, 25000)
      }

      this.ws.onmessage = (message) => {
        const data = JSON.parse(message.data)

        if (data.event === 'heartBeat' && data.content === 'pong') {
          console.log('receive server pong')
          if (this.heartBeatTimeoutJob !== -1) {
            clearTimeout(this.heartBeatTimeoutJob)
            this.heartBeatTimeoutJob = -1
          }
          return
        }

        this.onlineNum = data.num
        if (data.event === 'login') {
          this.msgList.push({
            content: `欢迎${data.userName}进入${data.roomName}房间～`,
          })
        } else if (data.event === 'logout') {
          console.log('logout', data)
          this.msgList.push({
            content: `${data.userName}离开房间`,
          })
        } else {
          const self = this.userId === data.userId
          if (self) return
          this.msgList.push({
            name: data.userName,
            self: false,
            content: data.content,
          })
        }
      }

      this.ws.onclose = () => {
        this.removeAllTimeJob()
        Toast('您已离开房间')
        this.roomOpen = false
        this.msgList = []
        this.onlineNum = 0
      }
    },
    connect () {
      this.ws = new WebSocket('ws://localhost:9001')
    },
    sendMsg () {
      if (!this.inputMsg.trim().length) return Toast('发言不能为空～')
      this.isSending = true
      
      this.ws.send(JSON.stringify({
        userName: this.nickname,
        userId: this.userId,
        roomId: this.currentRoomInfo.roomId,
        roomName: this.currentRoomInfo.name,
        content: this.inputMsg.trim(),
      }))
      // 本地默认显示
      this.msgList.push({
        content: `${this.inputMsg}`,
        name: this.nickname,
        self: true,
      })
      this.inputMsg = ''
      setTimeout(() => {
        this.scrollBottom()
        this.isSending = false
      }, 0)
    },
    close () {
      this.ws && this.ws.close()
    },
    back () {
      if (!this.roomOpen) return
      this.roomOpen = false
      this.msgList = []
      this.onlineNum = 0
      this.close()
      Toast({
        content: '您已退出房间',
        duration: 1000,
      })
    },
    certainName () {
      if (this.inputname.trim().length) {
        this.nickname = this.inputname.trim()
        this.userId = `${+new Date()}`
      } else {
        Toast('用户名不能为空！')
      }
    },
    // 移除所有定时器
    removeAllTimeJob() {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = -1
      clearTimeout(this.heartBeatTimeoutJob)
      this.heartBeatTimeoutJob = -1
    },
    msgChange() { // 监听消息列表变化以自动滚动到最新消息
      if (this.scrollBottomTimeId) {
        clearTimeout(this.scrollBottomTimeId)
        this.scrollBottomTimeId = null
      }
      setTimeout(() => {
        if (!this.scrollIsBottom) {
          this.scrollBottom()
          return
        }
        this.$nextTick(() => {
          const listHeight = this.msgListRef.offsetHeight
          const diff = listHeight - this.wrapperHeight // 列表高度与容器高度差值
          const top = this.msgWrapRef.scrollTop // 列表滚动高度
          if (diff - top > 10) {
            if (this.isBindScrolled) {
              this.isBindScrolled = false
              this.msgWrapRef.removeEventListener('scroll', this.addScroll, false)
            }
            this.msgWrapRef.scrollTo({
              top: diff + 10,
              left: 0,
              behavior: 'smooth',
            })
          } else if (!this.isSending) {
            if (!this.isBindScrolled) {
              this.isBindScrolled = true
              this.msgWrapRef.addEventListener('scroll', this.addScroll, false)
            }
          }
        })
      }, 500);
    },
    addScroll() {
      debounce(this.listScroll, 200)
      this.isBindScrolled = true
    },
    scrollBottom() {
      this.msgWrapRef.scrollTo({
        top: this.msgListRef.offsetHeight,
        left: 0,
        behavior: 'smooth',
      })
    },
    listScroll() {
      const ele = this.msgWrapRef
      const isBottom = isScrollBottom(ele, ele.clientHeight, 50)
      if (isBottom) {
        this.scrollIsBottom = true
      } else {
        this.scrollIsBottom = false
      }
    },
    sendInputKeydown(e) {
      let key = e.keyCode;  
      if (key == 13) {
        this.sendMsg()
      }
    },
    nameKeydown(e) {
      let key = e.keyCode;  
      if (key == 13) {
        this.certainName()
      }
    }
  },
  beforeDestroy() {
    this.removeAllTimeJob()
    this.close()
    this.msgWrapRef && this.msgWrapRef.removeEventListener('scroll', this.addScroll, false)
  }
}
</script>

<style scoped>
@import './index.scss';
</style>
