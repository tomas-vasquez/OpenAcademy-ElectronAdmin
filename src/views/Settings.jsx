import Layout from 'components/common/Layout'
import React, {Component} from 'react'
import Setting from "components/Settings"

export default class Settings extends Component {

  render() {
    return <Layout {...this.props}>
      <Setting />
    </Layout>
  }
}
