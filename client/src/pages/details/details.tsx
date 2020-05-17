import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// import { SetData } from './../setData/setData'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { AtButton,AtCard,AtIcon,AtList, AtListItem   } from 'taro-ui'
import './details.less'


const atCardStyle = {
  margin: '5px,0'
}
 
export default function Details(){
  const [wordList,setWordList] = useState([])
  const getData =  ()=>{
    wx.cloud.callFunction({
      name: 'getWordsList',
      success(res) {
        console.log(res.result)
        if(res && res.result){
          var list  =res.result
          // ts-ignore
          setWordList(list['data'])
        }
      
      },
      fail(err) {
        wx.showToast({
          title: '获取失败' + err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  const getColume = (name)=>{
    console.log(name)
    let audio = wx.createInnerAudioContext()
    audio.src = 'http://dict.youdao.com/dictvoice?audio='+ name 
    audio.play()
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <View>
      
      {wordList.map((post, index) =>
      <View className="list" key={index}>
        <AtCard
        extraStyle={atCardStyle}
          extra={post.phonetic}
          title={post.word}
          
        >
      {post.translate}
      <View className="list-icon">
        <AtIcon value='volume-plus' size='20' color='#000' onClick={()=>getColume(post.word)} />
      </View>
      
    </AtCard>
    </View>
    )}
       
      

    </View>
  );
} 
