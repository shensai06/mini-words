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
  AtModalContent,
  AtModalAction,
  AtTextarea,
  AtRadio
} from "taro-ui";
import "./special.less";

export default function Special() {
  const router = useRouter();

  const [specialId, handleSpecialId] = useState("");

  const [data, setData] = useState([
    {
      image:
        "https://7368-shem-0631c-1301105157.tcb.qcloud.la/static/images/add.png?sign=4fe30ae5cfa0477f3d480d7b60cf1c99&t=1590220330",
      value: "添加",
      id: 0
    }
  ]);

  const [isOpened, setIsOpened] = useState(false);

  const getData = id => {
    // getData
    // 获取所有 ID  对应_id的数据
    Taro.cloud.callFunction({
      name: "getWordType",
      data: { id },
      success(res) {
        if (res && res.result) {
          console.log(res, id);
        }
      },
      fail(err) {
        console.log(err, id);
        Taro.showToast({
          title: "获取失败" + err,
          icon: "none",
          duration: 2000
        });
      }
    });
  };
  const handleOk = () => {};
  const handleSkip = e => {
    if (e.id === 0) {
      return setIsOpened(true);
    }
    Taro.navigateTo({
      url: "/pages/details/details?id=" + e.id
    });
    console.log(e);
  };
  useEffect(() => {
    console.log(router);

    // 获取 router.params.id
    handleSpecialId(router.params.id);

    getData(router.params.id);
  }, []);
  return (
    <View>
      {/* <View className="'min-title'"> 超级单词本</View>
      <AtGrid mode="rect" data={data} onClick={handleSkip} />
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
      </AtModal> */}
    </View>
  );
}
