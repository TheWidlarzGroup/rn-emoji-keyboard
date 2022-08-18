import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import styles from './index.module.css'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <div className={styles.container}>
        <h1>🚀 RN Emoji Keyboard</h1>
        <h2>A lightweight, fully customizable emoji picker.</h2>
        <h2>Designated to be user and developer friendly! 💖</h2>
      </div>
    </Layout>
  )
}
