import avatarImg from "@/assets/avatar.jpg";
// 站点 / 个人信息统一配置
// 所有页面、布局组件应从此处读取，不要在组件内再写死同类数据

export const siteConfig = {
  // 博客名称（顶部 Header / 浏览器标签等）
  name: "ArClの精神角落!",

  // 首页 Hero Banner
  hero: {
    title: "強推周杰倫的《軌跡》~",
    subtitle:
      "这里不只有代码，还有游戏、音乐、AI 折腾记录，以及“这 Bug 到底是谁写的”日常。",
  },

  // 个人简介
  profile: {
    avatar: avatarImg,
    name: "ArCl",
    tagline: "No上班，只想 Ctrl+C 人生",
    bio: "懂一点 Java、会一点前端（是真的只会一点点），现在沉迷 AI、Cursor、OpenClaw 和各种 Vibe Coding。重度游戏玩家，偶尔弹吉他（练习时长两年半），喜欢周杰伦，做饭属于“跟着教程能做，但绝不想洗锅”的水平。人生信条：代码能跑就先别动。",
    location: "中国 · 安徽 · 工位摸鱼中",
  },

  // 技术栈（About 页使用）
  techStack: [
    { name: "Java", level: "能写，必要时刻vibe coding会出手" },
    { name: "SpringBoot", level: "我没说我会啊，谁给我整上来的？" },
    { name: "Cursor", level: "AI 牛马指挥官（别烧我的钱了〒▽〒）" },
    { name: "OpenClaw", level: "折腾半天终于跑起来了" },
    { name: "Vibe Coding", level: "越 vibe 越上头" },
    { name: "LOL", level: "上了大师却不被朋友认可之人" },
    { name: "三角洲", level: "威风的龙！" },
    { name: "周杰伦", level: "酷狗年度钉子户" },
  ],

  // 侧边栏徽章（type 对应 Element Plus el-tag 的 type）
  sidebarBadges: [
    { name: "拒绝加班", type: "danger" },
    { name: "AI 上头中", type: "warning" },
    { name: "深夜在线", type: "success" },
    { name: "游戏启动", type: "info" },
  ],

  // 社交链接
  social: {
    douyin: "https://v.douyin.com/xxxxx/",
    qq: "123456789",
    wechat: "your_wechat_id",
  },
};

export default siteConfig;
