import { Card, Statistic } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const StatisticCard = (props) => {

  const nav = useNavigate()

  return (
    <Card hoverable bordered={false} style={{background: '#59a4ff'}} onClick={()=>{nav(props.route)}}>
        <div className='d-flex align-items-center justify-content-between'>
        <Statistic
          title={props.title}
          value={props.value}
          precision={2}
          valueStyle={{
            color: '#000',
            fontWeight: 800,
            fontSize:24
          }}
        />
        {/* <Statistic
        //   title={props.title}
          value={props.thisMonth}
          prefix={<ArrowUpOutlined />}
          precision={0}
          valueStyle={{
            color: '#fff',
            fontWeight: 800,
            fontSize:16
          }}
          /> */}
          </div>
      </Card>
  )
}

export default StatisticCard