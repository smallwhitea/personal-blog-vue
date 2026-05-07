<script setup>
import { ref, computed } from "vue";
import { siteConfig } from "@/config/site";

// 个人信息（从 siteConfig 派生，保持模板原有字段名）
const profile = computed(() => ({
  avatar: siteConfig.profile.avatar,
  nickname: siteConfig.profile.name,
  bio: siteConfig.profile.bio,
  location: siteConfig.profile.location,
  email: siteConfig.social.email,
  github: siteConfig.social.github,
}));

// 技术栈
const techStack = siteConfig.techStack;

// 生存记录
const workExperiences = ref([
  {
    company: "某工位",
    position: "带薪摸鱼工程师",
    period: "2024 - 至今",
    desc: "白天认真上班，晚上认真幻想怎么不上班。平等讨厌一切跟上班有关的事。",
  },
  {
    company: "大学",
    position: "大学牲（伪装成成年人版）",
    period: "2020 - 2024",
    desc: "除了不在宿舍的时间都在宿舍呆着，外出活动仅限于宿舍团建，虽然几乎是每天~。",
  },

  {
    company: "高中",
    position: "刷题型生物",
    period: "2017 - 2020",
    desc: "每天都在“这道题到底选 A 还是选未来”之间反复横跳，顺便把周杰伦听成了青春背景音乐。（不是我说的，AI嘴替，本人懒得编辑了）",
  },
  {
    company: "初中时期",
    position: "半成熟人类",
    period: "2014 - 2017",
    desc: "开始接触互联网，游戏水平快速提升，学习成绩随机波动，人生逐渐开始互联网化。（同上）",
  },
  {
    company: "小学时期",
    position: "快乐星球居民",
    period: "2008 - 2014",
    desc: "人生巅峰时期。作业不多，烦恼没有，每天最大的难题是今晚几点回家。（这个说的还真没毛）",
  },
  {
    company: "幼年时期",
    position: "记忆缺失玩家",
    period: "2000 - 2008",
    desc: "由于年代久远，服务器暂未同步相关数据。",
  },
]);

// 项目经历
const projectExperiences = ref([
  {
    name: "个人博客",
    desc: "刚好在关注Vibe Coding，顺便搞个博客玩玩啦，也可以是互联网精神状态展示页。（作者有话说：好用就是烧钱）",
    tags: ["Vibe Coding", "Cursor", "Coding Plan"],
  },
  {
    name: "OpenClaw",
    desc: "前段时间玩了一下 AI Agent。（本来想弄成赛博的我来着，奈何时间有限，只能中道崩殂）",
    tags: ["AI Agent", "OpenClaw"],
  },
  {
    name: "做饭计划",
    desc: "理论上会做很多菜，实际上外卖软件比锅用得熟。（AI帮我凑数的，本质上一个人谁做饭啊！）",
    tags: ["做饭", "教程型选手", "洗锅困难户"],
  },
]);
</script>

<template>
  <div class="about-page">
    <!-- 个人信息卡 -->
    <el-card class="profile-card" shadow="never">
      <div class="profile-inner">
        <el-avatar :size="100" :src="profile.avatar" class="profile-avatar">
          {{ profile.nickname?.slice(0, 1) }}
        </el-avatar>
        <div class="profile-info">
          <div class="profile-name">{{ profile.nickname }}</div>
          <div class="profile-bio">{{ profile.bio }}</div>
          <div class="profile-meta">
            <span class="meta-item">
              <el-icon><Location /></el-icon>
              {{ profile.location }}
            </span>
            <span class="meta-item">
              <el-icon><Message /></el-icon>
              {{ profile.email }}
            </span>
            <el-link :underline="false" :href="profile.github" target="_blank">
              <el-icon><Link /></el-icon>
              GitHub
            </el-link>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 技术栈 -->
    <el-card class="section-card" shadow="never">
      <template #header>
        <div class="section-header">
          <el-icon><Collection /></el-icon>
          精神状态一览
        </div>
      </template>
      <div class="tech-stack">
        <el-tag
          v-for="tech in techStack"
          :key="tech.name"
          size="large"
          effect="light"
          type="primary"
          class="tech-tag"
        >
          {{ tech.name }}
          <span class="tech-level">({{ tech.level }})</span>
        </el-tag>
      </div>
    </el-card>

    <!-- 工作经历 -->
    <el-card class="section-card" shadow="never">
      <template #header>
        <div class="section-header">
          <el-icon><Briefcase /></el-icon>
          碳基生物生存记录
        </div>
      </template>
      <el-timeline class="timeline">
        <el-timeline-item
          v-for="(exp, idx) in workExperiences"
          :key="idx"
          :timestamp="exp.period"
          placement="top"
        >
          <div class="exp-item">
            <div class="exp-company">{{ exp.company }}</div>
            <div class="exp-position">{{ exp.position }}</div>
            <div class="exp-desc">{{ exp.desc }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <!-- 项目经历 -->
    <el-card class="section-card" shadow="never">
      <template #header>
        <div class="section-header">
          <el-icon><Document /></el-icon>
          最近折腾的东西
        </div>
      </template>
      <div class="project-list">
        <el-card
          v-for="(proj, idx) in projectExperiences"
          :key="idx"
          class="project-card"
          shadow="hover"
        >
          <div class="project-name">{{ proj.name }}</div>
          <div class="project-desc">{{ proj.desc }}</div>
          <div class="project-tags">
            <el-tag
              v-for="tag in proj.tags"
              :key="tag"
              size="small"
              effect="plain"
            >
              {{ tag }}
            </el-tag>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.profile-card,
.section-card {
  border-radius: 12px;
}
.profile-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.profile-avatar {
  margin-bottom: 16px;
  box-shadow: var(--shadow);
}
.profile-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-h);
  margin-bottom: 8px;
}
.profile-bio {
  font-size: 15px;
  color: var(--text);
  opacity: 0.9;
  margin-bottom: 16px;
}
.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
}
.meta-item {
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
}
.section-header {
  font-weight: 650;
  color: var(--text-h);
  display: flex;
  align-items: center;
  gap: 6px;
}
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.tech-tag {
  padding: 8px 16px;
  font-size: 14px;
}
.tech-level {
  font-size: 12px;
  opacity: 0.8;
  margin-left: 4px;
}
.timeline {
  padding-left: 12px;
}
.exp-item {
  padding: 8px 0;
}
.exp-company {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 4px;
}
.exp-position {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  opacity: 0.9;
  margin-bottom: 6px;
}
.exp-desc {
  font-size: 14px;
  color: var(--text);
  opacity: 0.85;
}
.project-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.project-card {
  padding: 16px;
}
.project-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-h);
  margin-bottom: 6px;
}
.project-desc {
  font-size: 14px;
  color: var(--text);
  opacity: 0.9;
  margin-bottom: 10px;
}
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
@media (max-width: 600px) {
  .profile-name {
    font-size: 22px;
  }
}
</style>
