import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtFloatLayout, AtIcon, AtList, AtListItem, AtTag, AtCard } from 'taro-ui'
import { useState, useEffect } from '@tarojs/taro'
import './SetData.less'
import '../../utils/xmlJson.js'

export default function SetData() {
  // 从当前链接中读取id
  const [wordValue, setWordValue] = useState('')
  const [isOpen, setIsOpened] = useState(false)
  const [wordData, setWordData] = useState({})
  const [isWord, setIsWord] = useState(false)
  const [data, setDate] = useState({
    word: 'issue',  // 单词
    phonetic: '[4234]', // 音标
    translate: 'haha', // 中文翻译
    sentence: [{  //例句
      chinese: '213',
      english: '1241'
    }],
    cid: '',  // 创建者
    type: 1,  //单词分类
    label: [1],// 单词标签
  })
  const handleChange = (e) => {
    // console.log(e)
    setWordValue(e)

  }
  // 是否是中文
  const checkCh = (str) => {
    var RegExp = new RegExp('[\\u4E00-\\u9FFF]', 'g');
    return RegExp.test(str);
  }
  const getWord = () => {
    wx.request({
      url: 'http://fy.webxml.com.cn/webservices/EnglishChinese.asmx/Translator',

      method: "POST",
      data: {
        wordKey: wordValue
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function (res) {
        var to_json = require('xmljson').to_json;
        to_json(res.data, function (error, data) {
          setWordData(data.DataSet['diffgr:diffgram'].Dictionary)
        });
      }
    })
  }
  const getColume = (e) => {
    let audio = wx.createInnerAudioContext()
    audio.src = 'http://dict.youdao.com/dictvoice?audio=' + wordValue
    audio.play()
    // http://dict.youdao.com/dictvoice?audio=issue
  }
  const onSubmit = () => {

  }
  const onReset = () => {

  }
  const searchWord = () => {
    if (wordValue === '') {
      return wx.showToast({
        title: '您还没有输入单词～',
        icon: 'none',
        duration: 2000
      })
    }

    getWord()
    setIsOpened(true)
  }
  const insertData = () => {
    if (wordData) {
      setDate({
        word: wordData.Trans.WordKey,  // 单词
        phonetic: `[ ${wordData.Trans.Pron}]`, // 音标
        translate: wordData.Trans.Translation, // 中文翻译
        sentence: wordData.Sentence,
        cid: '',  // 创建者
        type: 1,  //单词分类
        label: [1],// 单词标签
      })
      handleClose()
      setIsWord(true)
    }
  }
  const saveData = () => {
    wx.cloud.callFunction({
      name: 'setWordList',
      data,
      success() {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail(err) {
        wx.showToast({
          title: '添加失败' + err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  const handleClose = () => {
    setIsOpened(false)
  }
  // const IconSound = ()=>{
  //   return  <AtIcon value='volume-plus' size='30' color='#000' onClick={getColume}></AtIcon>

  // }
  useEffect(() => {

  }, [])
  return (
    <View>
      <View className=' at-row-but'>
        <AtInput
          name='value'
          title='单词'
          type='text'
          placeholder='支持中英文'
          value={wordValue}
          onChange={handleChange}
        />
        <AtButton onClick={searchWord} circle type='primary' size='small'>查询</AtButton>
      </View>
      {
          isWord
          ?(
            <View>
            <AtCard

            extra={data.phonetic}
            title={data.word}
            
          >
             <AtIcon value='volume-plus' size='30' color='#000' onClick={getColume}></AtIcon>
            {data.translate}
            <View>
              {data.sentence.map((post, index) =>
                <View key={index}>
                  {post.Orig}
                  {post.Trans}
                </View>
              )}
            </View>
            <AtTag type='primary' size="small" active circle>标签</AtTag>
            <AtTag type='primary' size="small" circle>标签</AtTag>
          </AtCard>
          </View>
          ):( <View> </View>)
        }
      
      <AtFloatLayout isOpened={isOpen} title={wordValue || ''} onClose={handleClose}>

        <AtIcon value='volume-plus' size='30' color='#000' onClick={getColume}></AtIcon>
        <View>
          [ {wordData.Trans.Pron}]
      </View>
        <View>
          {wordData.Trans.Translation}
        </View> 
        <View>
          {wordData.Sentence.map((post, index) =>
            <View key={index}>
              {post.Orig}

              {post.Trans}
            </View>
          )}
        </View>
        <AtButton circle type='primary' size='small' onClick={insertData} >插入编辑</AtButton>
      </AtFloatLayout>

      {isWord
          ?(<View className="page-bottom">
          <AtButton size='small' >取消</AtButton>
          <AtButton type='primary' size='small' onClick={saveData}>保存至单词本</AtButton>
        </View>):(
          <View></View>
        )
      }
      

    </View>
  )
}