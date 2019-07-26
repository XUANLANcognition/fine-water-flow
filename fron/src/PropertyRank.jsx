import React, { Component } from 'react'
import { List, Avatar, Typography } from 'antd'
import axios from 'axios'

import PropertyList from './PropertyList'

const { Title } = Typography

class PropertyRank extends Component {
    state = {
      data: [],
      initLoading: true
    }

    componentDidMount = async (v) => {
      await this.getData()
      this.setState({ initLoading: false })
    }

      getData = async (v) => {
        try {
          const response = await axios.get(
            'https://finewf.club:8080/api/property_rank/?format=json'
          )
          this.setState({ data: response.data })
        } catch (error) {
          console.log(error)
        }
      }

      render () {
        return (
          <div style={{ padding: '10px 10px', background: '#fff', borderRadius: '1px', boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
            <List
              header={<Title level={4}>积分榜</Title>}
              itemLayout='horizontal'
              dataSource={this.state.data}
              split={false}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar shape='square' src={item.last_name} />}
                    title={item.username}
                  />
                  {item.property}
                </List.Item>
              )}
            />
          </div>
        )
      }
}

export default PropertyRank
