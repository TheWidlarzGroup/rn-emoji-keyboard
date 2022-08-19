import React from 'react'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import GithubImage from './GitHub-Mark-64px 1.svg'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { Link } from 'react-router-dom'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <div className={styles.home_container}>
        <div className={styles.home_titleBox}>
          <h1 className={styles.home_title}>🚀 RN Emoji Keyboard</h1>
          <h2 className={styles.home_subtitle}>A lightweight, fully customizable emoji picker.</h2>
          <div className={styles.home_textBox}>
            <p className={styles.home_text}>Designated to be user and developer friendly! 💖</p>
          </div>
        </div>
        <Link to="docs/documentation/about" className={styles.home_documentationBox}>
          <span className={styles.home_title}>📄 Documentation</span>
        </Link>
        <a
          href="https://github.com/TheWidlarzGroup/rn-emoji-keyboard"
          target="_blank"
          className={styles.home_githubBox}>
          <GithubImage />
          <span className={styles.home_githubTitle}>GitHub</span>
        </a>
      </div>
    </Layout>
  )
}
