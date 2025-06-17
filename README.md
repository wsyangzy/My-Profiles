# proxy-profiles

## 1.Clash for Windwos

`官方文档`：https://docs.cfw.lbyczf.com/

https://dreamacro.github.io/clash/

### 预处理配置

`Settings-Profiles-Parsers-Edit`

**订阅链接末尾添加后缀`#slbable`后更新订阅执行**

> `配置文件预处理参数说明`：https://docs.cfw.lbyczf.com/contents/parser.html
>
> `负载均衡`：https://bulianglin.com/archives/lb.html
>
> `clash-rules`：https://github.com/Loyalsoldier/clash-rules
>
> [parser自动替换订阅规则，自由切换黑白名单](https://github.com/Fndroid/clash_for_windows_pkg/issues/2193)
>
> [parse配置/.ini配置](https://github.com/Fndroid/clash_for_windows_pkg/issues/2729)
>
> [过滤节点、分组（code实现）](https://github.com/Fndroid/clash_for_windows_pkg/issues/2579#issuecomment-1567688925)

#### `.ini`配置

> 参考[ACL4SSR_Online_Full_MultiMode.ini 全分组 多模式 重度用户使用](https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_MultiMode.ini)
>
> `在线订阅转换`：https://acl4ssr-sub.github.io
>
> `远程配置：https://raw.githubusercontent.com/wsyangzy/My-Clash-Profiles/main/Full_MultiMode.ini`
>
> [cutethotw/ClashRule](https://github.com/cutethotw/ClashRule)

#### issue

> [`获取配置文件和在线规则集时只能直连，导致无法获取配置和规则集`](https://github.com/Dreamacro/clash/issues/2775)：
>
> > [jsDelivr CDN](https://github.com/Fndroid/clash_for_windows_pkg/issues/2979#issuecomment-1116196740)/[FastGit](https://github.com/Dreamacro/clash/issues/898#issuecomment-675908855)
> >
> > [本地配置规则](https://github.com/Dreamacro/clash/issues/2775#issuecomment-1595928740)
> >
> > [parser预加载rule-providers到本地](https://github.com/Dreamacro/clash/issues/1385#issuecomment-1583996210)
>

#### 规则集

> [ACL4SSR/ACL4SSR](https://github.com/ACL4SSR/ACL4SSR/tree/master/Clash/config)
>
> [SleepyHeeead/subconverter-config](https://github.com/SleepyHeeead/subconverter-config)
>
> [Mazeorz/airports](https://github.com/Mazeorz/airports)
>
> [blackmatrix7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash)

## 2.其他代理工具

### Clash.Meta

https://wiki.metacubex.one

https://github.com/MetaCubeX/mihomo

https://github.com/MetaCubeX/ClashX.Meta

https://github.com/MetaCubeX/ClashMetaForAndroid

### Clash Verge

>[使用指南](https://github.com/zzzgydi/clash-verge/wiki/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97)
>
>[clash verge 配置详解](https://wiki.metacubex.one/config/proxy-groups/filter/)
>
>[clash verge 配置示例](https://wiki.metacubex.one/example/)
>
>[abrclano/Merge+Script](https://github.com/abrclano/Self-use-Rules/tree/main/Clash.verge)
>
>[test482/cfw parse](https://gist.github.com/test482/3572dbd15b4838a7f999a749104a77ee#file-paser-yaml)
>
>[test482/clash verge merge](https://gist.github.com/test482/62439ebb2fdba846c0e3071d299eae91#file-clash-verge-local-config-yaml)

替换clash.meta内核：https://github.com/kayaladream/Clash-Core-Change

### Clash Nyanpasu

https://github.com/keiko233/clash-nyanpasu

### clash-rev内核

https://github.com/MerlinKodo/clash-rev（已归档）

### mihomo

https://github.com/MetaCubeX/mihomo

### clashtui

https://github.com/JohanChane/clashtui

### Clash.Mini

https://github.com/MetaCubeX/Clash.Mini

https://github.com/kogekiplay/ClashMetaForWindows_Mini

### clashN

https://github.com/2dust/clashN

## 3.v2Ray

https://github.com/2dust/v2rayN

https://github.com/2dust/v2rayNG

## 4.sing-box

> https://github.com/SagerNet/sing-box
>
> https://github.com/hiddify/hiddify-next
>
> https://github.com/net-breaker/sing-land
>
> 订阅转换：https://github.com/Toperlock/sing-box-subscribe
>
> **机场订阅分流用于singbox**：`https://sing-box-subscribe.vercel.app/config/机场订阅`
>
> ##### **如果机场不支持singbox，下面有其他免费工具可使用。**
>
> IOS/Mac
>
> > sing-box：https://apps.apple.com/hk/app/sing-box/id6451272673
> >
> > potaso lite：https://apps.apple.com/us/app/potatso-lite/id1239860606
>
> Android
>
> > nekobox：https://github.com/MatsuriDayo/NekoBoxForAndroid
>
> Windows
>
> > clash-verge：https://github.com/zzzgydi/clash-verge
> >
> > clash meta 内核：https://github.com/MetaCubeX/Clash.Meta
> >
> > nekobox：https://github.com/MatsuriDayo/nekoray/releases
> >
> > v2rayN：https://github.com/2dust/v2rayN
>
> hysteria：https://github.com/apernet/hysteria

### 机场订阅转singbox配置，本地部署

https://jdssl.top/index.php/2023/12/07/singboxjson/

### sing-box使用免费vless节点

https://jdssl.top/index.php/2023/12/12/mac-ios-singbxvless/

