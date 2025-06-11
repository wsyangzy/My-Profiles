// 配置验证器
class ConfigValidator {
  static validateConfig(config) {
    const errors = [];

    if (!config || typeof config !== "object") {
      errors.push("配置对象无效");
      return errors;
    }

    // 验证代理
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
      typeof config?.["proxy-providers"] === "object"
        ? Object.keys(config["proxy-providers"]).length
        : 0;

    if (proxyCount === 0 && proxyProviderCount === 0) {
      errors.push("配置文件中未找到任何代理");
    }

    // 验证必要字段
    if (config.proxies && !Array.isArray(config.proxies)) {
      errors.push("proxies字段必须是数组");
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
      "https://dns.alidns.com/dns-query", // 阿里云公共DNS
      "https://doh.pub/dns-query", // 腾讯DNSPod
      "https://doh.360.cn/dns-query", // 360安全DNS
    ];
  }

  static getForeignNameservers() {
    return [
      "https://1.1.1.1/dns-query", // Cloudflare(主)
      "https://1.0.0.1/dns-query", // Cloudflare(备)
      "https://208.67.222.222/dns-query", // OpenDNS(主)
      "https://208.67.220.220/dns-query", // OpenDNS(备)
      "https://194.242.2.2/dns-query", // Mullvad(主)
      "https://194.242.2.3/dns-query", // Mullvad(备)
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
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/wsyangzy/My-Profiles/refs/heads/main/ruleset/AI.yaml",
        path: "./ruleset/blackmatrix7/AI.yaml",
      },

      // ACL4SSR规则集
      ProxyGFWlist: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list",
        path: "./ruleset/ACL4SSR/ProxyGFWlist.yaml",
      },
      Google: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list",
        path: "./ruleset/ACL4SSR/Google.yaml",
      },
      GoogleCN: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/GoogleCN.list",
        path: "./ruleset/ACL4SSR/GoogleCN.yaml",
      },
      GoogleCNProxyIP: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleCNProxyIP.list",
        path: "./ruleset/ACL4SSR/GoogleCNProxyIP.yaml",
      },
      GoogleEarth: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleEarth.list",
        path: "./ruleset/ACL4SSR/GoogleEarth.yaml",
      },
      GoogleFCM: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleFCM.list",
        path: "./ruleset/ACL4SSR/GoogleFCM.yaml",
      },
      YouTube: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list",
        path: "./ruleset/ACL4SSR/YouTube.yaml",
      },
      YouTubeMusic: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTubeMusic.list",
        path: "./ruleset/ACL4SSR/YouTubeMusic.yaml",
      },
      Discord: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Discord.list",
        path: "./ruleset/ACL4SSR/Discord.yaml",
      },
      Twitter: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitter.list",
        path: "./ruleset/ACL4SSR/Twitter.yaml",
      },
      Instagram: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Instagram.list",
        path: "./ruleset/ACL4SSR/Instagram.yaml",
      },
      Threads: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Threads.list",
        path: "./ruleset/ACL4SSR/Threads.yaml",
      },
      Facebook: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Facebook.list",
        path: "./ruleset/ACL4SSR/Facebook.yaml",
      },
      Pixiv: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Pixiv.list",
        path: "./ruleset/ACL4SSR/Pixiv.yaml",
      },
      TikTok: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/TikTok.list",
        path: "./ruleset/ACL4SSR/TikTok.yaml",
      },
      Twitch: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Twitch.list",
        path: "./ruleset/ACL4SSR/Twitch.yaml",
      },
      Telegram: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Telegram.list",
        path: "./ruleset/ACL4SSR/Telegram.yaml",
      },
      Spotify: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Spotify.list",
        path: "./ruleset/ACL4SSR/Spotify.yaml",
      },

      // 广告拦截规则
      BanAD: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
        path: "./ruleset/ACL4SSR/BanAD.yaml",
      },
      BanEasyList: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list",
        path: "./ruleset/ACL4SSR/BanEasyList.yaml",
      },
      BanEasyListChina: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list",
        path: "./ruleset/ACL4SSR/BanEasyListChina.yaml",
      },
      Github: {
        ...common,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list",
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
        filter: "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[hH][kK]|香港|港)).*$",
        flag: "hk",
      },
      {
        name: "新加坡节点",
        filter: "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[sS][pP]|新加坡|狮城)).*$",
        flag: "sg",
      },
      {
        name: "台湾节点",
        filter: "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[tT][wW]|台湾|台)).*$",
        flag: "tw",
      },
      {
        name: "日本节点",
        filter: "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[jJ][pP]|日本|日)).*$",
        flag: "jp",
      },
      {
        name: "韩国节点",
        filter: "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[kK][rR]|韩国|韩)).*$",
        flag: "kr",
      },
      {
        name: "美国节点",
        filter: "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[uU][sS]|美国|美)).*$",
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
          name: "其他节点",
          type: "url-test",
          tolerance: 100,
          "include-all": true,
          filter:
            "^(?:(?!.*[香港日台新韩美])|.*(?:(x10)|(x8)|10倍|8倍|chatGPT|GPT|gpt)).*$",
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
      "RULE-SET,Discord,香港节点",
      "RULE-SET,Pixiv,香港节点",

      // 通讯
      "RULE-SET,Telegram,香港节点",

      // 流媒体
      "RULE-SET,Twitch,香港节点",
      "RULE-SET,Spotify,香港节点",
      "RULE-SET,YouTube,香港节点",
      "RULE-SET,YouTubeMusic,香港节点",
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
    // 验证配置
    const errors = ConfigValidator.validateConfig(config);
    if (errors.length > 0) {
      throw new Error(`配置验证失败: ${errors.join(", ")}`);
    }

    // 生成配置
    config["dns"] = DNSManager.createDNSConfig();
    config["proxy-groups"] = ProxyGroupManager.createProxyGroups();
    config["rule-providers"] = RuleProviderManager.createRuleProviders();
    config["rules"] = RuleManager.createRules();

    return config;
  } catch (error) {
    throw error;
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
