// 国内DNS服务器
const domesticNameservers = [
    "https://dns.alidns.com/dns-query", // 阿里云公共DNS
    "https://doh.pub/dns-query", // 腾讯DNSPod
    "https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
    "https://1.1.1.1/dns-query", // Cloudflare(主)
    "https://1.0.0.1/dns-query", // Cloudflare(备)
    "https://208.67.222.222/dns-query", // OpenDNS(主)
    "https://208.67.220.220/dns-query", // OpenDNS(备)
    "https://194.242.2.2/dns-query", // Mullvad(主)
    "https://194.242.2.3/dns-query" // Mullvad(备)
];
// DNS配置
const dnsConfig = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": true,
    "use-system-hosts": false,
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
        // 本地主机/设备
        "+.lan",
        "+.local",
        // Windows网络出现小地球图标
        "+.msftconnecttest.com",
        "+.msftncsi.com",
        // QQ快速登录检测失败
        "localhost.ptlogin2.qq.com",
        "localhost.sec.qq.com",
        // 微信快速登录检测失败
        "localhost.work.weixin.qq.com"
    ],
    "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
    "nameserver": [...domesticNameservers, ...foreignNameservers],
    "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
    "nameserver-policy": {
        "geosite:private,cn,geolocation-cn": domesticNameservers,
        "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
    }
};
// 规则集通用配置
const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400
};
// 规则集配置
const ruleProviders = {
    direct: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
        path: "./ruleset/loyalsoldier/direct.yaml",
    },
    proxy: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
        path: "./ruleset/loyalsoldier/proxy.yaml",
    },
    reject: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
        path: "./ruleset/loyalsoldier/reject.yaml",
    },
    private: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
        path: "./ruleset/loyalsoldier/private.yaml",
    },
    apple: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
        path: "./ruleset/loyalsoldier/apple.yaml",
    },
    icloud: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
        path: "./ruleset/loyalsoldier/icloud.yaml",
    },
    gfw: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
        path: "./ruleset/loyalsoldier/gfw.yaml",
    },
    tldNotCn: {
        ...ruleProviderCommon,
        behavior: "domain",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
        path: "./ruleset/loyalsoldier/tld-not-cn.yaml",
    },
    lancidr: {
        ...ruleProviderCommon,
        behavior: "ipcidr",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
        path: "./ruleset/loyalsoldier/lancidr.yaml",
    },
    cncidr: {
        ...ruleProviderCommon,
        behavior: "ipcidr",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
        path: "./ruleset/loyalsoldier/cncidr.yaml",
    },
    applications: {
        ...ruleProviderCommon,
        behavior: "classical",
        url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
        path: "./ruleset/loyalsoldier/applications.yaml",
    },
    netflix: {
        ...ruleProviderCommon,
        behavior: "classical",
        url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/release/rule/Clash/Netflix/Netflix.yaml",
        path: "./ruleset/blackmatrix7/netflix.yaml",
    },
    AI: {
        type: "file",
        behavior: "classical",
        path: "./ruleset/blackmatrix7/AI.yaml",
    },
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
    }
};
// 规则
const rules = [
    "DOMAIN,clash.razord.top,DIRECT",
    "DOMAIN,yacd.haishan.me,DIRECT",
    "RULE-SET,Github,香港节点",
    "RULE-SET,Twitter,香港节点",
    "RULE-SET,Instagram,韩国节点",
    "RULE-SET,Threads,韩国节点",
    "RULE-SET,Facebook,韩国节点",
    "RULE-SET,TikTok,韩国节点",
    "RULE-SET,Discord,香港节点",
    "RULE-SET,Twitch,香港节点",
    "RULE-SET,Telegram,香港节点",
    "RULE-SET,Pixiv,香港节点",
    "RULE-SET,Spotify,香港节点",
    "RULE-SET,YouTube,香港节点",
    "RULE-SET,YouTubeMusic,香港节点",
    "RULE-SET,Google,香港节点",
    "RULE-SET,GoogleCN,香港节点",
    "RULE-SET,GoogleCNProxyIP,香港节点",
    "RULE-SET,GoogleEarth,香港节点",
    "RULE-SET,GoogleFCM,香港节点",
    "RULE-SET,netflix,解锁流媒体",
    "RULE-SET,AI,美国节点",
    "RULE-SET,BanAD,REJECT",
    "RULE-SET,BanEasyList,REJECT",
    "RULE-SET,BanEasyListChina,REJECT",
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
    "GEOIP,LAN,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "http://cp.cloudflare.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false
};

// 程序入口
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 覆盖原配置中DNS配置
    config["dns"] = dnsConfig;

    // 覆盖原配置中的代理组
    config["proxy-groups"] = [
        {
            ...groupBaseOption,
            "name": "节点选择",
            "type": "select",
            "proxies": ["延迟选优", "故障转移", "负载均衡", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "其他节点"],
            // "include-all": true,
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
        },
        {
            ...groupBaseOption,
            "name": "延迟选优",
            "type": "url-test",
            "tolerance": 100,
            "proxies": ["负载均衡", "香港节点", "新加坡节点", "台湾节点", "韩国节点"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
        },
        {
            ...groupBaseOption,
            "name": "负载均衡",
            "type": "url-test",
            "tolerance": 100,
            "proxies": ["负载均衡(散列)", "负载均衡(轮询)"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
        },
        {
            ...groupBaseOption,
            "name": "故障转移",
            "type": "fallback",
            "proxies": ["香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "美国节点", "负载均衡"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
        },
        {
            ...groupBaseOption,
            "name": "香港节点",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "filter": "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[hH][kK]|香港|港)).*$",
            "proxies": ["REJECT"],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
        },
        {
            ...groupBaseOption,
            "name": "新加坡节点",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "filter": "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[sS][pP]|新加坡|狮城)).*$",
            "proxies": ["REJECT"],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg",
        },
        {
            ...groupBaseOption,
            "name": "台湾节点",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "filter": "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[tT][wW]|台湾|台)).*$",
            "proxies": ["REJECT"],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg",
        },
        {
            ...groupBaseOption,
            "name": "日本节点",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "filter": "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[jJ][pP]|日本|日)).*$",
            "proxies": ["REJECT"],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg",
        },
        {
            ...groupBaseOption,
            "name": "韩国节点",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "filter": "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[kK][rR]|韩国|韩)).*$",
            "proxies": ["REJECT"],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/kr.svg",
        },
        {
            ...groupBaseOption,
            "name": "美国节点",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "filter": "^(?!.*(x10|x8|10倍|8倍))(?=.*(?:[uU][sS]|美国|美)).*$",
            "proxies": ["REJECT"],
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg",
        },
        {
            ...groupBaseOption,
            "name": "其他节点",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "filter": "^(?:(?!.*[香港日台新韩美])|.*(?:(x10)|(x8)|10倍|8倍|chatGPT|GPT|gpt)).*$",
            "proxies": ["REJECT"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/unknown.svg",
        },

        {
            ...groupBaseOption,
            "name": "负载均衡(散列)",
            "type": "load-balance",
            "strategy": "consistent-hashing",
            "proxies": ["香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
        },
        {
            ...groupBaseOption,
            "name": "负载均衡(轮询)",
            "type": "load-balance",
            "strategy": "round-robin",
            "proxies": ["香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
        },
        {
            ...groupBaseOption,
            "name": "解锁流媒体",
            "type": "select",
            "proxies": ["DIRECT", "节点选择", "延迟选优", "故障转移", "负载均衡", "香港节点", "新加坡节点", "台湾节点"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
        },
        {
            ...groupBaseOption,
            "name": "全局直连",
            "type": "select",
            "proxies": ["DIRECT", "节点选择", "延迟选优", "故障转移", "负载均衡"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
        },
        {
            ...groupBaseOption,
            "name": "全局拦截",
            "type": "select",
            "proxies": ["REJECT", "DIRECT"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
        },
        {
            ...groupBaseOption,
            "name": "漏网之鱼",
            "type": "select",
            "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡", "全局直连"],
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
        }
    ];

    // 覆盖原配置中的规则
    config["rule-providers"] = ruleProviders;
    config["rules"] = rules;

    // 返回修改后的配置
    return config;
}
