<script setup>
import { computed } from "vue";
import MarkdownIt from "markdown-it";

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: "",
  },
});

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

const renderedHtml = computed(() => {
  if (!props.content) return "";
  return md.render(props.content);
});
</script>

<template>
  <div class="markdown-body" v-html="renderedHtml"></div>
</template>

<style scoped lang="scss">
.markdown-body {
  line-height: 1.8;
  color: var(--text-regular);
  font-size: 16px;
}

.markdown-body :deep(p) {
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.8;
}

.markdown-body :deep(> p:first-child) {
  margin-top: 0;
}

.markdown-body :deep(> *:last-child) {
  margin-bottom: 0;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin-top: 28px;
  margin-bottom: 16px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--text-primary);
}

.markdown-body :deep(h1) {
  font-size: 32px;
  padding-bottom: 12px;
  background: linear-gradient(
    90deg,
    var(--neon-blue),
    var(--neon-purple),
    var(--neon-pink)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.markdown-body :deep(h2) {
  font-size: 26px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-lighter);
  position: relative;
}

.markdown-body :deep(h2::before) {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, var(--neon-blue), transparent);
}

.markdown-body :deep(h3) {
  font-size: 22px;
  color: var(--neon-blue);
}

.markdown-body :deep(a) {
  color: var(--neon-blue);
  text-decoration: none;
  transition: color 0.2s ease;
}

.markdown-body :deep(a:hover) {
  color: var(--neon-cyan);
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 0;
  list-style: none;
}

.markdown-body :deep(li) {
  margin: 12px 0;
  padding-left: 40px;
  line-height: 1.8;
  position: relative;
}

.markdown-body :deep(li > p) {
  margin: 4px 0;
}

.markdown-body :deep(ul > li::before) {
  content: "";
  position: absolute;
  left: 14px;
  top: 0.78em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--neon-purple);
  box-shadow: 0 0 8px var(--neon-purple);
  transform: translateY(-50%);
}

.markdown-body :deep(ul ul) {
  padding-left: 22px;
  margin: 8px 0;
}

.markdown-body :deep(ul ul > li) {
  padding-left: 36px;
}

.markdown-body :deep(ul ul > li::before) {
  width: 6px;
  height: 6px;
  background: var(--neon-pink);
  box-shadow: 0 0 6px var(--neon-pink);
  border-radius: 0;
  transform: translateY(-50%) rotate(45deg);
}

.markdown-body :deep(ul ul ul > li::before) {
  background: var(--neon-blue);
  box-shadow: 0 0 6px var(--neon-blue);
  border-radius: 2px;
  transform: translateY(-50%);
}

.markdown-body :deep(ol) {
  counter-reset: list-counter;
}

.markdown-body :deep(ol > li) {
  counter-increment: list-counter;
}

.markdown-body :deep(ol > li::before) {
  content: counter(list-counter) ".";
  position: absolute;
  left: 0;
  top: 0.12em;
  width: 32px;
  font-weight: 700;
  color: var(--neon-blue);
  text-align: right;
}

.markdown-body :deep(ol ol) {
  padding-left: 22px;
  margin: 8px 0;
  counter-reset: list-counter-alpha;
}

.markdown-body :deep(ol ol > li) {
  counter-increment: list-counter-alpha;
  padding-left: 36px;
}

.markdown-body :deep(ol ol > li::before) {
  content: counter(list-counter-alpha, lower-alpha) ".";
  color: var(--neon-purple);
}

.markdown-body :deep(ol ol ol) {
  counter-reset: list-counter-roman;
}

.markdown-body :deep(ol ol ol > li) {
  counter-increment: list-counter-roman;
}

.markdown-body :deep(ol ol ol > li::before) {
  content: counter(list-counter-roman, lower-roman) ".";
  color: var(--neon-pink);
}

.markdown-body :deep(blockquote) {
  margin: 16px 0;
  padding: 16px 20px;
  border-left: 4px solid;
  border-image: linear-gradient(
      180deg,
      var(--neon-blue),
      var(--neon-purple),
      var(--neon-pink)
    )
    1;
  background: linear-gradient(
    135deg,
    rgba(76, 201, 255, 0.08),
    rgba(168, 85, 247, 0.04)
  );
  border-radius: 0 8px 8px 0;
  position: relative;
}

.markdown-body :deep(blockquote p) {
  margin: 0;
  color: var(--text-primary);
  font-style: italic;
}

.markdown-body :deep(code) {
  font-family: var(--font-code);
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 6px;
  background: linear-gradient(
    135deg,
    rgba(76, 201, 255, 0.12),
    rgba(168, 85, 247, 0.08)
  );
  color: var(--neon-cyan);
  border: 1px solid rgba(76, 201, 255, 0.2);
}

.markdown-body :deep(pre) {
  margin: 16px 0;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4),
    rgba(16, 18, 34, 0.6)
  );
  border: 1px solid rgba(76, 201, 255, 0.25);
  overflow-x: auto;
  position: relative;
  box-shadow:
    0 0 20px rgba(76, 201, 255, 0.15),
    0 0 40px rgba(168, 85, 247, 0.1);
}

.markdown-body :deep(pre code) {
  padding: 0;
  background: transparent;
  border: none;
  color: var(--text-primary);
  line-height: 1.7;
  display: block;
}

.markdown-body :deep(strong),
.markdown-body :deep(b) {
  color: var(--neon-yellow);
  font-weight: 700;
}

.markdown-body :deep(em),
.markdown-body :deep(i) {
  color: var(--neon-pink);
}

.markdown-body :deep(hr) {
  margin: 24px 0;
  height: 2px;
  border: none;
  background: linear-gradient(
    90deg,
    transparent,
    var(--neon-blue),
    var(--neon-purple),
    var(--neon-pink),
    transparent
  );
  opacity: 0.6;
}

.markdown-body :deep(table) {
  width: 100%;
  margin: 16px 0;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 12px 16px;
  border: 1px solid var(--border-lighter);
}

.markdown-body :deep(th) {
  background: linear-gradient(
    135deg,
    rgba(76, 201, 255, 0.15),
    rgba(168, 85, 247, 0.08)
  );
  color: var(--neon-blue);
  font-weight: 600;
}

.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 16px 0;
}

.markdown-body :deep(input[type="checkbox"]) {
  margin-right: 8px;
  accent-color: var(--neon-blue);
}
</style>
