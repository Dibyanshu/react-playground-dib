import React from 'react'

const codeSnippet = `// You don't write this code by hand. You build the pieces.
// React combines them to create the final output.

<App>
  <Header>
    <Navigation />
    <SearchBar />
  </Header>

  <MainContent>
    <Article title="Welcome to React!" />
    <Article title="Understanding Components" />
  </MainContent>

  <Footer />
</App>`

export default function TopicBasics() {
  return (
    <section className="topic-basics">
      <h4>Basic (Syntax) — Component tree</h4>
      <div className="basics-grid">
        <div className="code-block">
          <pre><code>{codeSnippet}</code></pre>
        </div>

        <div className="visual-tree" aria-hidden>
          <div className="node app">App
            <div className="node header">Header
              <div className="node small">Navigation</div>
              <div className="node small">SearchBar</div>
            </div>
            <div className="node main">MainContent
              <div className="node small">Article</div>
              <div className="node small">Article</div>
            </div>
            <div className="node small">Footer</div>
          </div>
        </div>
      </div>
    </section>
  )
}
