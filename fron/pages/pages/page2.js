import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'antd'
import React from 'react';
import 'antd/dist/antd.css';

export default function Page2() {
  return (
    <div>
      <Button type="primary">警告</Button>
      <div>This is page2</div>
    </div>
  )
}