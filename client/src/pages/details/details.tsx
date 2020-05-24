import { View, Button, Text } from "@tarojs/components";
// import { SetData } from './../setData/setData'
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
  useRouter
} from "@tarojs/taro";
import {
  AtButton,
  AtFab,
  AtSwipeAction,
  AtCard,
  AtIcon,
  AtList,
  AtListItem
} from "taro-ui";
import "./details.less";

const atCardStyle = {
  margin: "5px,0"
};

export default function Details() {
  const router = useRouter();
  const [wordList, setWordList] = useState([]);
  const [specialId, setSpecialId] = useState("");
  const getData = () => {
    Taro.cloud.callFunction({
      name: "getWordsList",
      success(res) {
        console.log(res.result);
        if (res && res.result) {
          var list = res.result;
          // ts-ignore
          setWordList(list["data"]);
        }
      },
      fail(err) {
        Taro.showToast({
          title: "获取失败" + err,
          icon: "none",
          duration: 2000
        });
      }
    });
  };
  const getColume = name => {
    console.log(name);
    let audio = Taro.createInnerAudioContext();
    audio.src = "http://dict.youdao.com/dictvoice?audio=" + name;
    audio.play();
  };

  const skipPage = () => {
    Taro.navigateTo({
      url: "/pages/setData/setData?specialId=" + specialId
    });
  };
  const handleSwipe = e => {
    if (e.text !== "删除") {
      return;
    }
    //
    Taro.showModal({
      title: "提示",
      content: "确认删除该条数据？",
      success(res) {
        if (res.confirm) {
          delList(e.type);
        } else if (res.cancel) {
          console.log("取消");
        }
      }
    });
  };
  const delList = id => {
    Taro.cloud.callFunction({
      name: "delWordSList",
      data: { id },
      success(res) {
        console.log(res.result);
        if (res && res.result) {
          getData();
          Taro.showToast({
            title: "删除成功",
            icon: "success",
            duration: 2000
          });
        }
      },
      fail() {
        Taro.showToast({
          title: "删除失败",
          icon: "success",
          duration: 2000
        });
      }
    });
  };
  useEffect(() => {
    setSpecialId(router.params.specialId);
    getData();
  }, []);
  return (
    <View>
      <View>XXXX单词 </View>

      {wordList.map((post, index) => (
        <View className="list" key={String(index)}>
          <AtSwipeAction
            onClick={handleSwipe}
            autoClose
            options={[
              {
                text: "取消",

                style: {
                  backgroundColor: "#6190E8"
                }
              },
              {
                text: "删除",
                type: post._id,
                style: {
                  backgroundColor: "#FF4949"
                }
              }
            ]}
          >
            <AtCard
              extraStyle={atCardStyle}
              extra={post.phonetic}
              title={post.word}
            >
              {post.translate}
              <View className="list-icon">
                <AtIcon
                  value="volume-plus"
                  size="20"
                  color="#000"
                  onClick={() => getColume(post.word)}
                />
              </View>
            </AtCard>
          </AtSwipeAction>
        </View>
      ))}
      <View className="detail-fixed fixed">
        <AtFab onClick={skipPage}>
          <Text className="at-fab__icon at-icon at-icon-add"></Text>
        </AtFab>
      </View>
    </View>
  );
}
