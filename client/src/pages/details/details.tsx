import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// import { SetData } from './../setData/setData'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { AtInput, AtForm,AtButton,AtIcon } from 'taro-ui'
import './details.less'

const DB = wx.cloud.database().collection('word-public')
export default function Details(){
  const [word,setWord] = useState({
    src: '',
    audioCtx: null,
  })
  const addData =  ()=>{
    DB.add({
      data:{
        content:'234',
        eid:'2342',
        explain:'342'
      },
      success(res){
        console.log('添加成功',res)
      },
      fail(err){
        console.log('添加失败',err)
      }

    })
  }
  const getColume = (e)=>{
    let audio = wx.createInnerAudioContext()
    audio.src = 'http://dict.youdao.com/dictvoice?audio=issue' 
    audio.play()
// http://dict.youdao.com/dictvoice?audio=issue
  }

/**
 * 将XML的Document对象转换为JSON字符串
 * @param xmlDoc xml的Document对象
 * @return string
 */
function convertToJSON(xmlDoc) {
  //准备JSON字符串和缓存（提升性能）
  var jsonStr = "";
  var buffer = new Array();

  buffer.push("{");
  //获取xml文档的所有子节点
  var nodeList = xmlDoc.childNodes;

  generate(nodeList);

  /**
   * 中间函数，用于递归解析xml文档对象，并附加到json字符串中
   * @param node_list xml文档的的nodeList
   */
  function generate(node_list) {

      for (var i = 0; i < node_list.length; i++) {
          var curr_node = node_list[i];
          //忽略子节点中的换行和空格
          if (curr_node.nodeType == 3) {
              continue;
          }
          //如果子节点还包括子节点，则继续进行遍历
          if (curr_node.childNodes.length > 1) {
              buffer.push("\"" + curr_node.nodeName + "\": {");
              generate(curr_node.childNodes);
          } else {
              var firstChild = curr_node.childNodes[0];

              if (firstChild != null) {
                  //nodeValue不为null
                  buffer.push("\"" + curr_node.nodeName + "\":\"" + firstChild.nodeValue + "\"");
              } else {
                  //nodeValue为null
                  buffer.push("\"" + curr_node.nodeName + "\":\"\"");
              }

          }
          if (i < (node_list.length - 2)) {
              buffer.push(",");
          } else {
              break;
          }
      }
      //添加末尾的"}"
      buffer.push("}");
  }

  jsonStr = buffer.join("");
  return jsonStr;
}
  useEffect(()=>{
    wx.request({
      url: 'http://ws.webxml.com.cn//WebServices/TranslatorWebService.asmx/getEnCnTwoWayTranslator?Word=issue', 
      data: {},
      success: function(res) {
        console.log(res.data);
        var arr = []
        var  str = res.data.toString()
         str = str.replace(/\<[^>]*\>(([^<])*)/g, (e,d)=> {
          if(d.trim()){
            arr.push(d)
          }
          
          })
          console.log(arr)
        }
  })

  DB.get({
    success(res){
      console.log('查询成功',res)
    },
    fail(err){
      console.log('查询失败',err)
    }

  })
},[])
  return (
    <View>
      <AtIcon value='volume-plus' size='30' color='#000' onClick={getColume}></AtIcon>
      
      <AtButton onClick={addData}>334343</AtButton>

      {/* <SetData></SetData> */}
    </View>
  );
} 
