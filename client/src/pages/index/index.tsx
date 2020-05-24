import { View, Button, Text } from "@tarojs/components";
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
  AtInput,
  AtForm,
  AtButton,
  AtGrid,
  AtModal,
  AtModalHeader,
  AtTextarea,
  AtModalContent,
  AtModalAction,
  AtRadio
} from "taro-ui";
import "./index.less";

const url = "https://7368-shem-0631c-1301105157.tcb.qcloud.la/static/images/";
const defaultData = [
  {
    image: url + "add.png",
    value: "添加",
    id: 0
  }
];

export default function Index() {
  const router = useRouter();
  const [pageName, setPageName] = useState("");
  const [specialId, setSpecialId] = useState("");
  const [mode, setMode] = useState("square");
  const [isOpened, setIsOpened] = useState(false);
  const [imageValue, setImageValue] = useState("code-a");
  const [addData, setAddData] = useState({
    value: "",
    abstract: "",
    image: url + "code-a",
    rootTypeId: 0 // 此页面添加的默认都是根级别
  });

  const [data, setData] = useState();

  const getData = id => {
    Taro.cloud.callFunction({
      name: "getWordType",
      data: { id },
      success(res) {
        if (res && res.result) {
          setData(res.result.data.concat(defaultData));
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

  const handleSkip = e => {
    if (e.id === 0) {
      return setIsOpened(true);
    }
    if (specialId) {
      Taro.navigateTo({
        url: "/pages/details/details?specialId=" + specialId
      });
    }
    console.log("点击参数", e);
    Taro.navigateTo({
      url: "/pages/index/index?id=" + e._id + "&name=" + e.value
    });
  };

  const handleIsOpened = () => {
    setIsOpened(false);
  };
  const handleOk = () => {
    handleIsOpened();
    //  插入数据
    console.log("specialId", specialId);
    setTimeout(function() {
      Taro.hideLoading();
    }, 10000);
    Taro.cloud.callFunction({
      name: "setWordType",
      data: {
        ...addData,
        image: url + imageValue + ".png",
        rootTypeId: specialId
      },
      success() {
        Taro.hideLoading();
        Taro.showToast({
          title: "添加成功",
          duration: 2000
        });
        return getData(specialId);
      },
      fail(err) {
        Taro.hideLoading();
        console.log(err);
        Taro.showToast({
          title: "添加失败" + err,
          icon: "none",
          duration: 2000
        });
      }
    });
  };
  const handleAbstract = e => {
    setAddData({ ...addData, abstract: e });
    console.log(e);
  };
  const handleValue = e => {
    setAddData({ ...addData, value: e });
  };
  //
  const handleChangeImage = e => {
    setImageValue(e);
  };
  useEffect(() => {
    console.log(router.params);
    router.params.id ? setMode("rect") : setMode("square");
    setSpecialId(router.params.id);
    setPageName(router.params.name);
    getData(router.params.id);
  }, []);

  return (
    <View>
      <View className="'min-title'">{pageName || "超级单词本"}</View>
      <AtGrid data={data} mode={mode} onClick={handleSkip} />
      <AtModal isOpened={isOpened}>
        <AtModalHeader>添加分类</AtModalHeader>
        <AtModalContent>
          <AtInput
            name="value"
            // title="名称"
            type="text"
            placeholder="输入名称"
            value={addData.value}
            onChange={handleValue}
          />
          <AtTextarea
            value={addData.abstract}
            onChange={handleAbstract}
            maxLength={200}
            placeholder="输入简介..."
          />
          <AtRadio
            options={[
              {
                label: "code-a",
                value: "code-a"
              },
              {
                label: "code-b",
                value: "code-b"
              },
              {
                label: "code-c",
                value: "code-c"
              },
              {
                label: "code-d",
                value: "code-d"
              }
            ]}
            value={imageValue}
            onClick={handleChangeImage}
          />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={handleIsOpened}>取消</Button>{" "}
          <Button onClick={handleOk}>确定</Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
}
