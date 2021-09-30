import React, { useState } from 'react'
import { Table, Button, Popconfirm, Modal } from 'antd'
import css from 'styled-jsx/css'

export default () => {
  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left'
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left'
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150
    },
    // { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
      title: 'Column 9',
      dataIndex: 'address',
      key: '9',
      width: 350
    },
    {
      title: 'Column 10',
      dataIndex: 'address',
      key: '10',
      width: 250
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
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

  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`
    })
  }

  const [currentData, setCurrentData] = useState({})
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const onUpdate = (row) => {
    console.log('==> onUpdate', row)
    setCurrentData({ ...row })
    setVisible(true)
  }

  const onDelete = (row) => {
    console.log('==> onDelete', row)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <div className="table-container">
      <Table bordered columns={columns} dataSource={data} scroll={{ x: 500 }} />
      <Modal title="Title" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <h1>{currentData.key}</h1>
      </Modal>
      <style jsx>{styles}</style>
    </div>
  )
}

const styles = css`
  .table-container {
    width: 100%;
  }
`
