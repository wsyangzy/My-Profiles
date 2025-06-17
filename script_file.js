// 地区与高倍关键词常量
const REGION_KEYWORDS = {
  hk: "(?:[hH][kK]|香港|港)",
  sg: "(?:[sS][gG]|新加坡|狮城)",
  tw: "(?:[tT][wW]|台湾|台)",
  jp: "(?:[jJ][pP]|日本|日)",
  kr: "(?:[kK][rR]|韩国|韩)",
  us: "(?:[uU][sS]|美国|美)",
};
const MULTI_KEYWORDS = "(x10|x8|x5|10倍|8倍|5倍)";

// 配置验证器
class ConfigValidator {
  static validateConfig(config) {
    const errors = [];

    if (!config || typeof config !== "object") {
      errors.push("配置不是有效的对象。");
      return errors;
    }

    // 验证代理
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
      typeof config?.["proxy-providers"] === "object"
        ? Object.keys(config["proxy-providers"]).length
        : 0;

    if (proxyCount === 0 && proxyProviderCount === 0) {
      errors.push("未检测到任何代理或代理提供者。");
    }

    // 验证必要字段
    if (config.proxies && !Array.isArray(config.proxies)) {
      errors.push("proxies 字段必须为数组。");
    }

    return errors;
  }

  static validateProxy(proxy) {
    if (!proxy || typeof proxy !== "object") return false;
    return proxy.name && proxy.type && proxy.server;
  }
}

// DNS配置管理器
class DNSManager {
  static getDomesticNameservers() {
    return [
      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query",
      "https://doh.360.cn/dns-query",
    ];
  }

  static getForeignNameservers() {
    return [
      "https://1.1.1.1/dns-query",
      "https://1.0.0.1/dns-query",
      "https://208.67.222.222/dns-query",
      "https://208.67.220.220/dns-query",
      "https://194.242.2.2/dns-query",
      "https://194.242.2.3/dns-query",
    ];
  }

  static createDNSConfig() {
    const domesticNameservers = this.getDomesticNameservers();
    const foreignNameservers = this.getForeignNameservers();

    return {
      enable: true,
      listen: "0.0.0.0:1053",
      ipv6: true,
      "use-system-hosts": false,
      "cache-algorithm": "arc",
      "enhanced-mode": "fake-ip",
      "fake-ip-range": "198.18.0.1/16",
      "fake-ip-filter": [
        "+.lan",
        "+.local",
        "+.msftconnecttest.com",
        "+.msftncsi.com",
        "localhost.ptlogin2.qq.com",
        "localhost.sec.qq.com",
        "localhost.work.weixin.qq.com",
      ],
      "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
      nameserver: [...domesticNameservers, ...foreignNameservers],
      "proxy-server-nameserver": [
        ...domesticNameservers,
        ...foreignNameservers,
      ],
      "nameserver-policy": {
        "geosite:private,cn,geolocation-cn": domesticNameservers,
        "geosite:google,youtube,telegram,gfw,geolocation-!cn":
          foreignNameservers,
      },
    };
  }
}

// 规则提供器管理器
class RuleProviderManager {
  static getRuleProviderCommon() {
    return {
      type: "http",
      format: "yaml",
      interval: 86400,
    };
  }

  static createRuleProviders() {
    const common = this.getRuleProviderCommon();

    return {
      // Loyalsoldier规则集
      direct: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
        path: "./ruleset/loyalsoldier/direct.yaml",
      },
      proxy: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
        path: "./ruleset/loyalsoldier/proxy.yaml",
      },
      reject: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
        path: "./ruleset/loyalsoldier/reject.yaml",
      },
      private: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
        path: "./ruleset/loyalsoldier/private.yaml",
      },
      apple: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
        path: "./ruleset/loyalsoldier/apple.yaml",
      },
      icloud: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
        path: "./ruleset/loyalsoldier/icloud.yaml",
      },
      gfw: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
        path: "./ruleset/loyalsoldier/gfw.yaml",
      },
      tldNotCn: {
        ...common,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
        path: "./ruleset/loyalsoldier/tld-not-cn.yaml",
      },
      lancidr: {
        ...common,
        behavior: "ipcidr",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
        path: "./ruleset/loyalsoldier/lancidr.yaml",
      },
      cncidr: {
        ...common,
        behavior: "ipcidr",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
        path: "./ruleset/loyalsoldier/cncidr.yaml",
      },
      applications: {
        ...common,
        behavior: "classical",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
        path: "./ruleset/loyalsoldier/applications.yaml",
      },

      // 流媒体和服务规则
      netflix: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/Netflix/Netflix.yaml",
        path: "./ruleset/blackmatrix7/netflix.yaml",
      },
      AI: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/blackmatrix7/AI.yaml",
      },

      // ACL4SSR规则集
      ProxyGFWlist: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/ProxyGFWlist.yaml",
      },
      Google: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Google.yaml",
      },
      GoogleCN: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/GoogleCN.yaml",
      },
      GoogleCNProxyIP: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/GoogleCNProxyIP.yaml",
      },
      GoogleEarth: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/GoogleEarth.yaml",
      },
      GoogleFCM: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/GoogleFCM.yaml",
      },
      YouTube: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/YouTube.yaml",
      },
      YouTubeMusic: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/YouTubeMusic.yaml",
      },
      Discord: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Discord.yaml",
      },
      Twitter: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Twitter.yaml",
      },
      Instagram: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Instagram.yaml",
      },
      Threads: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Threads.yaml",
      },
      Facebook: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Facebook.yaml",
      },
      Pixiv: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Pixiv.yaml",
      },
      TikTok: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/TikTok.yaml",
      },
      Twitch: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Twitch.yaml",
      },
      Telegram: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Telegram.yaml",
      },
      Spotify: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Spotify.yaml",
      },

      // 广告拦截规则
      BanAD: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/BanAD.yaml",
      },
      BanEasyList: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/BanEasyList.yaml",
      },
      BanEasyListChina: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/BanEasyListChina.yaml",
      },
      Github: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/ACL4SSR/Github.yaml",
      },
    };
  }
}

// 代理组管理器
class ProxyGroupManager {
  static getGroupBaseOption() {
    return {
      interval: 300,
      timeout: 3000,
      url: "http://cp.cloudflare.com/generate_204",
      lazy: true,
      "max-failed-times": 3,
      hidden: false,
    };
  }

  static createProxyGroups() {
    const base = this.getGroupBaseOption();
    const iconBase =
      "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons";

    return [
      {
        ...base,
        name: "节点选择",
        type: "select",
        proxies: [
          "延迟选优",
          "故障转移",
          "负载均衡",
          "香港节点",
          "新加坡节点",
          "台湾节点",
          "日本节点",
          "韩国节点",
          "美国节点",
          "高倍节点",
          "其他节点",
        ],
        icon: `${iconBase}/adjust.svg`,
      },
      {
        ...base,
        name: "延迟选优",
        type: "url-test",
        tolerance: 100,
        proxies: ["负载均衡", "香港节点", "新加坡节点", "台湾节点", "韩国节点"],
        icon: `${iconBase}/speed.svg`,
      },
      {
        ...base,
        name: "负载均衡",
        type: "url-test",
        tolerance: 100,
        proxies: ["负载均衡(散列)", "负载均衡(轮询)"],
        icon: `${iconBase}/balance.svg`,
      },
      {
        ...base,
        name: "故障转移",
        type: "fallback",
        proxies: [
          "香港节点",
          "新加坡节点",
          "台湾节点",
          "日本节点",
          "韩国节点",
          "美国节点",
          "负载均衡",
        ],
        icon: `${iconBase}/ambulance.svg`,
      },
      // 地区节点组
      ...this.createRegionalGroups(base, iconBase),
      // 负载均衡组
      ...this.createLoadBalanceGroups(base, iconBase),
      // 功能组
      ...this.createFunctionGroups(base, iconBase),
    ];
  }

  static createRegionalGroups(base, iconBase) {
    const regions = [
      {
        name: "香港节点",
        filter: `^(?:(?!${MULTI_KEYWORDS}).)*${REGION_KEYWORDS.hk}.*`,
        flag: "hk",
      },
      {
        name: "新加坡节点",
        filter: `^(?:(?!${MULTI_KEYWORDS}).)*${REGION_KEYWORDS.sg}.*`,
        flag: "sg",
      },
      {
        name: "台湾节点",
        filter: `^(?:(?!${MULTI_KEYWORDS}).)*${REGION_KEYWORDS.tw}.*`,
        flag: "tw",
      },
      {
        name: "日本节点",
        filter: `^(?:(?!${MULTI_KEYWORDS}).)*${REGION_KEYWORDS.jp}.*`,
        flag: "jp",
      },
      {
        name: "韩国节点",
        filter: `^(?:(?!${MULTI_KEYWORDS}).)*${REGION_KEYWORDS.kr}.*`,
        flag: "kr",
      },
      {
        name: "美国节点",
        filter: `^(?:(?!${MULTI_KEYWORDS}).)*${REGION_KEYWORDS.us}.*`,
        flag: "us",
      },
    ];

    return regions
      .map((region) => ({
        ...base,
        name: region.name,
        type: "url-test",
        tolerance: 100,
        "include-all": true,
        filter: region.filter,
        proxies: ["REJECT"],
        icon: `${iconBase}/flags/${region.flag}.svg`,
      }))
      .concat([
        {
          ...base,
          name: "高倍节点",
          type: "select",
          tolerance: 100,
          "include-all": true,
          filter: MULTI_KEYWORDS,
          proxies: ["REJECT"],
          icon: `https://fastly.jsdelivr.net/gh/wsyangzy/My-Profiles@main/icon/urltest.svg`,
        },
        {
          ...base,
          name: "其他节点",
          type: "select",
          tolerance: 100,
          "include-all": true,
          // 排除所有地区节点
          filter: `^(?:(?!${Object.values(REGION_KEYWORDS).join("|")}).)*$`,
          proxies: ["REJECT"],
          icon: `${iconBase}/unknown.svg`,
        },
      ]);
  }

  static createLoadBalanceGroups(base, iconBase) {
    const regionalProxies = [
      "香港节点",
      "新加坡节点",
      "台湾节点",
      "日本节点",
      "韩国节点",
    ];

    return [
      {
        ...base,
        name: "负载均衡(散列)",
        type: "load-balance",
        strategy: "consistent-hashing",
        proxies: regionalProxies,
        icon: `${iconBase}/merry_go.svg`,
      },
      {
        ...base,
        name: "负载均衡(轮询)",
        type: "load-balance",
        strategy: "round-robin",
        proxies: regionalProxies,
        icon: `${iconBase}/balance.svg`,
      },
    ];
  }

  static createFunctionGroups(base, iconBase) {
    return [
      {
        ...base,
        name: "解锁流媒体",
        type: "select",
        proxies: [
          "DIRECT",
          "节点选择",
          "延迟选优",
          "故障转移",
          "负载均衡",
          "香港节点",
          "新加坡节点",
          "台湾节点",
        ],
        icon: `${iconBase}/youtube.svg`,
      },
      {
        ...base,
        name: "全局直连",
        type: "select",
        proxies: ["DIRECT", "节点选择", "延迟选优", "故障转移", "负载均衡"],
        icon: `${iconBase}/link.svg`,
      },
      {
        ...base,
        name: "全局拦截",
        type: "select",
        proxies: ["REJECT", "DIRECT"],
        icon: `${iconBase}/block.svg`,
      },
      {
        ...base,
        name: "漏网之鱼",
        type: "select",
        proxies: ["节点选择", "延迟选优", "故障转移", "负载均衡", "全局直连"],
        icon: `${iconBase}/fish.svg`,
      },
    ];
  }
}

// 规则管理器
class RuleManager {
  static createRules() {
    return [
      // 系统规则
      "DOMAIN,clash.razord.top,DIRECT",
      "DOMAIN,yacd.haishan.me,DIRECT",

      // 开发和工具
      "RULE-SET,Github,香港节点",

      // 社交媒体
      "RULE-SET,Twitter,香港节点",
      "RULE-SET,Instagram,韩国节点",
      "RULE-SET,Threads,韩国节点",
      "RULE-SET,Facebook,韩国节点",
      "RULE-SET,TikTok,韩国节点",
      "RULE-SET,Discord,节点选择",
      "RULE-SET,Pixiv,节点选择",

      // 通讯
      "RULE-SET,Telegram,节点选择",

      // 流媒体
      "RULE-SET,Twitch,节点选择",
      "RULE-SET,Spotify,节点选择",
      "RULE-SET,YouTube,节点选择",
      "RULE-SET,YouTubeMusic,节点选择",
      "RULE-SET,netflix,解锁流媒体",

      // 搜索引擎
      "RULE-SET,Google,香港节点",
      "RULE-SET,GoogleCN,香港节点",
      "RULE-SET,GoogleCNProxyIP,香港节点",
      "RULE-SET,GoogleEarth,香港节点",
      "RULE-SET,GoogleFCM,香港节点",

      // AI服务
      "RULE-SET,AI,美国节点",

      // 广告拦截
      "RULE-SET,BanAD,REJECT",
      "RULE-SET,BanEasyList,REJECT",
      "RULE-SET,BanEasyListChina,REJECT",

      // 基础规则
      "RULE-SET,private,DIRECT",
      "RULE-SET,reject,REJECT",
      "RULE-SET,icloud,DIRECT",
      "RULE-SET,apple,DIRECT",
      "RULE-SET,proxy,节点选择",
      "RULE-SET,direct,DIRECT",
      "RULE-SET,lancidr,DIRECT",
      "RULE-SET,cncidr,DIRECT",
      "RULE-SET,applications,DIRECT",
      "RULE-SET,ProxyGFWlist,节点选择",

      // 地理位置规则
      "GEOIP,LAN,DIRECT",
      "GEOIP,CN,DIRECT",

      // 最终规则
      "MATCH,漏网之鱼",
    ];
  }
}

// 主函数 - 程序入口
function main(config) {
  try {
    const errors = ConfigValidator.validateConfig(config);
    if (errors.length > 0) {
      console.error("配置校验失败：", errors);
      return;
    }
    const dnsConfig = DNSManager.createDNSConfig();
    const ruleProviders = RuleProviderManager.createRuleProviders();
    const proxyGroups = ProxyGroupManager.createProxyGroups();
    const rules = RuleManager.createRules();

    // 返回合成后的配置对象
    return {
      ...config,
      dns: dnsConfig,
      "rule-providers": ruleProviders,
      "proxy-groups": proxyGroups,
      rules,
    };
  } catch (error) {
    console.error("主函数执行出错：", error);
    return null;
  }
}

// 导出模块（如果需要）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    main,
    ConfigValidator,
    DNSManager,
    RuleProviderManager,
    ProxyGroupManager,
    RuleManager,
  };
}
