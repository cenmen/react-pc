import React, { useState, useEffect } from 'react'
import { Form, Table, Input, InputNumber, Button, Popconfirm, Modal, message } from 'antd'
import css from 'styled-jsx/css'
import api from '../api/phone'

export default () => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'brand',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: 'Action',
      key: 'operation',
      width: 250,
      render: (row) => {
        return (
          <div>
            <Button type="link" onClick={() => onUpdate(row)}>
              编辑
            </Button>
            <Popconfirm title="确定删除？" onConfirm={() => onDelete(row)} okText="是" cancelText="否">
              <Button type="link">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    onLoad()
  }, [])

  const onLoad = async () => {
    const data = await api.list()
    setDataSource(data)
  }

  const [dataSource, setDataSource] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  const onUpdate = ({ id }) => {
    console.log('==> onUpdate', id)
    setCurrentId(id)
    setVisible(true)
  }

  const onDelete = async ({ id }) => {
    console.log('==> onDelete', id)
    try {
      const res = await api.remove({ id })
      message.success(res.data.message)
      onLoad()
    } catch (error) {
      message.error('删除失败')
    }
  }

  return (
    <div className="table-container">
      <div className="">
        <Button
          type="primary"
          onClick={() => {
            setVisible(true)
            setCurrentId(null)
          }}
        >
          新增
        </Button>
      </div>
      <Table bordered rowKey="id" columns={columns} dataSource={dataSource} />
      <FormModal id={currentId} visible={visible} close={() => setVisible(false)} refresh={() => onLoad()}></FormModal>
      <style jsx>{styles}</style>
    </div>
  )
}

const FormModal = ({ id, visible, close, refresh }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    id ? loadData() : form.resetFields()
  }, [id])

  const loadData = async () => {
    const { data } = await api.detail({ id })
    form.setFieldsValue(data)
  }

  const submit = async (values) => {
    try {
      const res = id ? await api.update(values) : await api.add(values)
      message.success(res.data.message)
      refresh()
    } catch (error) {
      message.error(error.response.data.message || '新增失败')
    }
    close()
  }

  return (
    <Modal title={id ? '编辑' : '新增'} visible={visible} closable footer={null} onCancel={() => close()}>
      <Form form={form} name="basic" onFinish={submit}>
        <Form.Item label="id" name="id" rules={[{ required: true, message: 'Please input your id!' }]}>
          <Input disabled={!!id} />
        </Form.Item>
        <Form.Item label="name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="price" name="price" rules={[{ required: true, message: 'Please input your price!' }]}>
          <InputNumber controls={false} />
        </Form.Item>
        <Form.Item label="brand" name="brand" rules={[{ required: true, message: 'Please input your brand!' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const styles = css`
  .table-container {
    width: 100%;
  }
`
