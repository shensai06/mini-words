import { View, Text } from "@tarojs/components";
import {
  AtForm,
  AtInput,
  AtButton,
  AtFloatLayout,
  AtIcon,
  AtList,
  AtListItem,
  AtTag,
  AtCard,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "taro-ui";
import { useState, useEffect } from "@tarojs/taro";
import "./SetData.less";
import "../../utils/xmlJson.js";

export default function SetData() {
  // 从当前链接中读取id
  const [wordValue, setWordValue] = useState("");
  const [isOpen, setIsOpened] = useState(false);
  const [isOpenedModel, setIsOpenedModel] = useState(false);
  const [wordData, setWordData] = useState({});
  const [isWord, setIsWord] = useState(false);
  const [data, setDate] = useState({
    word: "issue", // 单词
    phonetic: "[4234]", // 音标
    translate: "haha", // 中文翻译
    sentence: [
      {
        //例句
        chinese: "213",
        english: "1241"
      }
    ],
    cid: "", // 创建者
    type: 1, //单词分类
    label: [1] // 单词标签
  });
  const handleChange = e => {
    // console.log(e)
    setWordValue(e);
  };
  // 是否是中文
  const checkCh = str => {
    var RegExp = new RegExp("[\\u4E00-\\u9FFF]", "g");
    return RegExp.test(str);
  };
  const getWord = () => {
    Taro.request({
      url: "http://fy.webxml.com.cn/webservices/EnglishChinese.asmx/Translator",

      method: "POST",
      data: {
        wordKey: wordValue
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: function(res) {
        var to_json = require("xmljson").to_json;
        to_json(res.data, function(error, data) {
          setWordData(data.DataSet["diffgr:diffgram"].Dictionary);
        });
      }
    });
  };
  const getColume = () => {
    let audio = Taro.createInnerAudioContext();
    audio.src = "http://dict.youdao.com/dictvoice?audio=" + wordValue;
    audio.play();
    // http://dict.youdao.com/dictvoice?audio=issue
  };
  const onSubmit = () => {};
  const onReset = () => {};
  const searchWord = () => {
    if (wordValue === "") {
      return wx.showToast({
        title: "您还没有输入单词～",
        icon: "none",
        duration: 2000
      });
    }

    getWord();
    setIsOpened(true);
  };
  const insertData = () => {
    if (wordData) {
      setDate({
        word: wordData.Trans.WordKey, // 单词
        phonetic: `[ ${wordData.Trans.Pron}]`, // 音标
        translate: wordData.Trans.Translation, // 中文翻译
        sentence: wordData.Sentence,
        cid: "", // 创建者
        type: 1, //单词分类
        label: [1] // 单词标签
      });
      handleClose();
      setIsWord(true);
    }
  };
  const saveData = () => {
    Taro.showLoading({
      title: "加载中"
    });

    setTimeout(function() {
      Taro.hideLoading();
    }, 10000);
    Taro.cloud.callFunction({
      name: "setWordList",
      data,
      success() {
        wx.hideLoading();
        setIsOpenedModel(true);
      },
      fail(err) {
        Taro.hideLoading();
        Taro.showToast({
          title: "添加失败" + err,
          icon: "none",
          duration: 2000
        });
      }
    });
  };
  const handleClose = () => {
    setIsOpened(false);
  };
  // const IconSound = ()=>{
  //   return  <AtIcon value='volume-plus' size='30' color='#000' onClick={getColume}></AtIcon>

  // }
  const handleModelConfirm = () => {
    Taro.navigateTo({
      url: "/pages/details/details"
    });
  };
  useEffect(() => {}, []);
  return (
    <View>
      <View className="at-row-but">
        <AtInput
          name="value"
          title="单词"
          type="text"
          placeholder="支持中英文"
          value={wordValue}
          onChange={handleChange}
        />
        <AtButton onClick={searchWord} circle type="primary" size="small">
          查询
        </AtButton>
      </View>
      {isWord ? (
        <View>
          <AtCard extra={data.phonetic} title={data.word}>
            <AtIcon
              value="volume-plus"
              size="30"
              color="#000"
              onClick={getColume}
            ></AtIcon>
            {data.translate}
            <View>
              {data.sentence.map((post, index) => (
                <View key={index}>
                  {post.Orig}
                  {post.Trans}
                </View>
              ))}
            </View>
            <AtTag type="primary" size="small" active circle>
              标签
            </AtTag>
            <AtTag type="primary" size="small" circle>
              标签
            </AtTag>
          </AtCard>
        </View>
      ) : (
        <View> </View>
      )}

      <AtFloatLayout
        scrollY
        scrollTop={24}
        scrollWithAnimation
        lowerThreshold={32}
        isOpened={isOpen}
        title={wordValue || ""}
        onClose={handleClose}
      >
        <AtIcon
          value="volume-plus"
          size="30"
          color="#000"
          onClick={getColume}
        ></AtIcon>
        <View>
          <View>[ {wordData.Trans.Pron}]</View>
          <View>{wordData.Trans.Translation}</View>
          <View>
            {wordData.Sentence.map((post, index) => (
              <View key={index}>
                {post.Orig}

                {post.Trans}
              </View>
            ))}
          </View>
        </View>

        <View className="at-bottom-btn">
          <AtButton onClick={handleClose}>取消</AtButton>
          <AtButton type="primary" onClick={insertData}>
            插入编辑
          </AtButton>
        </View>
      </AtFloatLayout>

      {isWord ? (
        <View className="at-bottom-btn at-bottom-one">
          <AtButton type="primary" onClick={saveData}>
            保存至单词本
          </AtButton>
        </View>
      ) : (
        <View></View>
      )}
      <AtModal
        isOpened={isOpenedModel}
        title="添加成功"
        cancelText="继续查询"
        confirmText="去单词本"
        onClose={() => setIsOpenedModel(false)}
        onCancel={() => setIsOpenedModel(false)}
        onConfirm={handleModelConfirm}
        content="新增的单词添加至***单词本，点击下方“去单词本”可查看"
      />
    </View>
  );
}
