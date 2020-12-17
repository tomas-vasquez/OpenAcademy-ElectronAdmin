import React from "react"
import {Form, Input} from "reactstrap"
import DB from "helpers/DB"

const onChange = (event, key) => {
  DB.set(key, event.target.value)
}

function index() {
  return (
    <div className="content">
      <Form>
        <h2 className="my-3">Main:</h2>
        <p className="m-0 mt-1">UserName:</p>
        <Input defaultValue={DB.get('username')} onChange={e => onChange(e, 'username')} />
        <p className="m-0 mt-1">Pasword:</p>
        <Input defaultValue={DB.get('password')} type="password" onChange={e => onChange(e, 'password')} />
        <p className="m-0 mt-1">Server url:</p>
        <Input defaultValue={DB.get('serverUrl')} onChange={e => onChange(e, 'serverUrl')} />

        <h2 className="my-3" >Cloudynary:</h2>
        <p className="m-0 mt-1">Cloud name:</p>
        <Input defaultValue={DB.get('cloudName')} onChange={e => onChange(e, 'cloudName')} />
        <p className="m-0 mt-1">Api Key:</p>
        <Input defaultValue={DB.get('apiKey')} onChange={e => onChange(e, 'apiKey')} />
        <p className="m-0 mt-1">Api Secret:</p>
        <Input defaultValue={DB.get('apiSecret')} onChange={e => onChange(e, 'apiSecret')} />
      </Form>
    </div>
  )
}

export default index
