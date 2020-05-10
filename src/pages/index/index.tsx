import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { AtInput, AtForm,AtButton } from 'taro-ui'
import './index.less'

wx.cloud.init({
  env:'shem-0631c'
})
const DB = wx.cloud.database().collection('list')
export default function Index(){
  const [count, setCount] = useState(0);
  const [age, setAge] = useState<number>();
  const [name, setName] = useState<string>('');
  const [deleteId, setDelId] = useState<string>('');
  const addData =  ()=>{
    DB.add({
      data:{
        name,
        age
      },
      success(res){
        console.log('添加成功',res)
      },
      fail(err){
        console.log('添加失败',err)
      }

    })
  }
  const getData = ()=>{

    DB.get({
      success(res){
        console.log('查询成功',res)
      },
      fail(err){
        console.log('查询失败',err)
      }

    })
  }
  const delData = ()=>{

    DB.doc(deleteId).remove({
      success(res){
        console.log('删除成功',res)
      },
      fail(err){
        console.log('删除失败',err)
      }

    })
  }
  const setData = ()=>{
    DB.doc(deleteId).update({
      data:{
        name,
        age
      },
      success(res){
        console.log('修改成功',res)
      },
      fail(err){
        console.log('修改失败',err)
      }
    })
  }
  function addName (value){
    setName(value)
  }
  function addAge (value){
    setAge(parseInt(value))
  }
  const delId =(id)=>{
    console.log(id)
    setDelId(id)
  }
  useEffect(()=>{
    console.log(3)
  },[])
  return (
    <View>
      <view>云函数数据测试</view>
      <AtButton type='primary' onClick={getData}>查询数据</AtButton>
      <AtInput placeholder='删除的id' name="id" type="number" onChange={delId} />
      <AtInput placeholder='输入名字' name="name" type="text" onChange={addName} />
      <AtInput placeholder='输入年龄' name="age" type="number" onChange={addAge} />
      <AtButton onClick={addData} type="secondary">添加数据</AtButton>
      <AtButton onClick={setData} type="primary">修改数据</AtButton>
      <AtButton onClick={delData} type="primary">删除数据</AtButton>
    </View>
  );
} 
