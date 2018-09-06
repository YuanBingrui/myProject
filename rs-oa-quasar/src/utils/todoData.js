export const wfidObj = {
  OA_GZRZ: 'OA_GZRZ',
  DMG_CPWD: 'DMG_CPWD',
  OA_GZJH: 'OA_GZJH',
  FYBX_FYBX: 'FYBX_FYBX',
  XS_SOMXSP: 'XS_SOMXSP',
  CG_POPS: 'CG_POPS',
  CGJS_FKSQ: 'CGJS_FKSQ',
  OA_GGXX: 'OA_GGXX',
  CGJS_FKJH: 'CGJS_FKJH',
  KQ_GRKQ: 'KQ_GRKQ',
  OA_CCSQ: 'OA_CCSQ',
  XS_FYJHSP: 'XS_FYJHSP',
  CG_XQSQSP: 'CG_XQSQSP',
  HCP_ZYFS_YWTC: 'HCP_ZYFS_YWTC',
  FYBX_SWSQ: 'FYBX_SWSQ',
  FYBX_WZLYSQ: 'FYBX_WZLYSQ',
  HCP_ZYFS_SOFKTJBG: 'HCP_ZYFS_SOFKTJBG',
  HCP_ZYFS_XSSK: 'HCP_ZYFS_XSSK',
  XSJS_QTKPSQ: 'XSJS_QTKPSQ',
  FYBX_FYDJ: 'FYBX_FYDJ',
  FYBX_WZLYDJ: 'FYBX_WZLYDJ'
}

export const TodoDetailDatas = {
  OA_GZRZ: {
    PageType: 'Type01Page',
    HeaderInfo: { MC_id: 'GZRZ_WHR', SJ_id: 'GZRZ_GZRQ' },
    MainContent: [
      { id: 'GZRZ_WFPNAME', name: '状态' },
      { id: 'GZRZ_FL', name: '分类' },
      { id: 'GZRZ_GS', name: '工时(天)' },
      { id: 'GZRZ_WFHUSERNAME', name: '已处理人' },
      {
        id: 'ContentCards',
        values: [
          { id: 'GZRZ_ZT', name: '主题' },
          { id: 'GZRZ_RZNR', name: '内容' }
        ]
      }
    ]
  },
  DMG_CPWD: {
    PageType: 'Type01Page',
    HeaderInfo: { MC_id: 'CPWD_TWR', SJ_id: 'CPWD_TWSJ' },
    MainContent: [
      { id: 'GCXM_XMMC', name: '项目名称' },
      { id: 'CPWD_XMJD', name: '项目阶段' },
      { id: 'CPWD_XQSJ', name: '需求时间' },
      { id: 'CPWD_WFPNAME', name: '工作流状态' },
      { id: 'CPWD_FL', name: '分类' },
      { id: 'CPWD_YXJ', name: '优先级' },
      { id: 'CPWD_YXSM', name: '优先级理由' },
      { id: 'ZJ_ZJMC', name: '组件名称' },
      { id: 'MK_MC', name: '模块名称' },
      {
        id: 'ContentCards',
        values: [
          { id: 'CPWD_WTBJ', name: '问答背景' },
          { id: 'CPWD_WTZT', name: '问题主题' },
          { id: 'CPWD_WTNR', name: '问题内容' },
          { id: 'CPWD_GKMB', name: '需求价值' },
          { id: 'CPWD_HDNR', name: '回答内容' }
        ]
      },
      { id: 'CPWD_HDR', name: '回答人' },
      { id: 'CPWD_WFHUSERNAME', name: '已处理人' },
      { id: 'CPWD_BZ', name: '备注' },
      { id: 'CPWD_WHR', name: '维护人' },
      { id: 'CPWD_WHSJ', name: '维护时间' }
    ]
  },
  OA_GZJH: {
    PageType: 'Type01Page',
    HeaderInfo: { MC_id: 'RYXX_MC', SJ_id: 'ZJH_WHSJ' },
    MainContent: [
      { id: 'ZJH_ZT', name: '状态' },
      { id: 'ZJH_KSRQ', name: '开始日期' },
      { id: 'ZJH_JSRQ', name: '结束日期' },
      { id: 'ZJH_WFPNAME', name: '状态名称' },
      { id: 'BM_BMMC', name: '部门名称' },
      { id: 'ZJH_WFWUSERNAME', name: '待处理人' },
      { id: 'ZJH_BZ', name: '备注' }
    ],
    DetailsContent: {
      Title: { id: 'GCXM_XMMC', sub_id: 'GCXM_XMMC', sub_des: 'ZJHMX_RWZYX' },
      Content: [
        { id: 'ZJHMX_NR', name: '内容' },
        { id: 'ZJHMX_LX', name: '类型' },
        { id: 'ZJHMX_ZT', name: '状态' }
      ]
    }
  },
  FYBX_FYBX: {
    PageType: 'Type02Page',
    Collapsible: { id: 'BXD', name: '报销单' },
    HeaderInfo: { MC_id: 'BXRMC', SJ_id: 'BXBMMC' },
    MainContent: [
      { id: 'FYBX_BXDID', name: '报销单号' },
      { id: 'FYLX_MC', name: '费用类型' },
      { id: 'FYBX_WFPNAME', name: '工作流状态' },
      { id: 'KJDW_JC', name: '会计单位' },
      { id: 'FYBX_BXRQ', name: '报销日期' },
      { id: 'FYBX_QSRQ', name: '起始日期' },
      { id: 'FYBX_ZZRQ', name: '终止日期' },
      { id: 'ZFDXMC', name: '支付对象' },
      { id: 'FYBX_FYSYRMC', name: '费用使用人' },
      { id: 'FYBX_BXSY', name: '报销事由' },
      { id: 'FYBX_BXZE', name: '报销总额' },
      { id: 'FYBX_ZFJE', name: '支付总额' },
      { id: 'FYBX_CXJKJE', name: '冲销借款' },
      { id: 'CDBMMC', name: '承担部门' },
      { id: 'GCXM_XMMC', name: '承担项目' },
      { id: 'FYBX_CDWLDW', name: '往来单位' },
      { id: 'FYBX_SCFS', name: '生成方式' },
      { id: 'FYBX_SOID', name: '销售订单' },
      { id: 'FYBX_YEAR', name: '年度' },
      { id: 'FYBX_MONTH', name: '月份' },
      { id: 'FYBX_LYDLX', name: '来源单类型' },
      { id: 'FYBX_BZ', name: '备注' },
      { id: 'FYBX_WFHUSERNAME', name: '已处理人' },
      { id: 'FYBX_WHR', name: '维护人' },
      { id: 'FYBX_WHSJ', name: '维护时间' }
    ],
    DetailsCollapsible: { id: 'FYBXMX', name: '费用报销明细' },
    DetailsContent: {
      Title: {
        id: 'FYXM_XMMC'
      },
      Content: [
        { id: 'FYBXMX_QSRQ', name: '起始日期' },
        { id: 'FYBXMX_ZZRQ', name: '终止日期' },
        { id: 'GCXM_XMMC', name: '承担项目' },
        { id: 'BM_BMMC', name: '承担部门' },
        { id: 'HB_MC', name: '货币' },
        { id: 'FYBXMX_SQBXJE', name: '申请报销金额' },
        { id: 'FYBXMX_FPJE', name: '发票金额' },
        { id: 'FYBXMX_QRBXJE', name: '确认报销金额' }
      ]
    }
  },
  XS_SOMXSP: {
    PageType: 'Type01Page',
    MainContent: [
      { id: 'SOMXPS_SOID', name: '订单编码' },
      { id: 'SOMX_ZLH', name: '制令号' },
      { id: 'GCXM_XMMC', name: '项目名称' },
      { id: 'KHXX_JC', name: '客户名称' },
      { id: 'XSYMC', name: '销售员' },
      { id: 'SOMXPS_WLID', name: '物料编码' },
      { id: 'WLXX_MC', name: '物料名称' },
      { id: 'SOMXPS_XQSL', name: '需求数量' },
      { id: 'SOMX_HSJG', name: '含税价格' },
      { id: 'SOMX_HSJE', name: '含税金额' },
      { id: 'SOMX_WSJG', name: '无税价格' },
      { id: 'SOMX_WSJE', name: '无税金额' },
      { id: 'SOMXPS_JHFHRQ', name: '计划发货日期' },
      { id: 'SOMXPS_YXFHRQ', name: '允许发货日期' },
      { id: 'SOMXPS_QRFHRQ', name: '确认发货日期' },
      { id: 'SOMXPS_BZ', name: '备注' }
    ],
    DetailsCards: {
      Title: { id: 'HQYJ', name: '会签意见' },
      Content: {
        main_id: 'SOMXHQ_YJ',
        con_id: 'HQRYMC',
        sub_con_id: 'SOMXHQ_HQRQ'
      }
    }
  },
  CG_POPS: {
    PageType: 'Type02Page',
    Collapsible: { id: 'CGDDPSGZL', name: '采购订单评审工作流' },
    MainContent: [
      { id: 'POPS_POID', name: '订单号' },
      { id: 'PO_DDRQ', name: '订单日期' },
      { id: 'PO_XQRQ', name: '需求日期' },
      { id: 'PO_JHDHRQ', name: '计划到货日期' },
      { id: 'GYSXX_JC', name: '供应商' },
      { id: 'BM_BMMC', name: '采购部门' },
      { id: 'CGY_MC', name: '采购员' },
      { id: 'PO_JSFS', name: '结算方式' },
      { id: 'PO_LX', name: '采购类型' },
      { id: 'POPS_ZT', name: '工作流状态' },
      { id: 'POPS_BZ', name: '备注' }
    ],
    Details1Collapsible: { id: 'DDMX', name: '订单明细' },
    Details1Content: {
      Content: [
        { id: 'WLXX_MC', name: '物料名称' },
        { id: 'WLXX_MC', name: '物料名称' },
        { id: 'WLXX_JLDW', name: '计量单位' },
        { id: 'WLXX_GG', name: '规格' },
        { id: 'POMX_XQSL', name: '需求数量' },
        { id: 'POMX_HSJG', name: '含税价格' },
        { id: 'POMX_HSJE', name: '含税金额' },
        { id: 'POMX_WSJG', name: '无税价格' },
        { id: 'POMX_WSJE', name: '无税金额' }
      ]
    },
    DetailsCollapsible: { id: 'HQYJ', name: '会签意见' },
    DetailsCards: {
      Content: {
        main_id: 'SOMXHQ_YJ',
        con_id: 'HQRYMC',
        sub_con_id: 'SOMXHQ_HQRQ'
      }
    }
  },
  CGJS_FKSQ: {
    PageType: 'Type01Page',
    MainContent: [
      { id: 'FKSQ_SQDID', name: '申请单号' },
      { id: 'FKSQ_FKLX', name: '付款类型' },
      { id: 'FKSQ_FKDX', name: '付款对象' },
      { id: 'FKSQ_FKRQ', name: '付款日期' },
      { id: 'KJDW_JC', name: '会计单位' },
      { id: 'FKSQ_SKDWMC', name: '收款单位' },
      { id: 'FKSQ_BMMC', name: '采购部门' },
      { id: 'FKSQ_SQRQ', name: '申请日期' },
      { id: 'FKSQ_HBMC', name: '货币' },
      { id: 'FKSQ_HL', name: '汇率' },
      { id: 'FKSQ_FKJE', name: '付款金额' },
      { id: 'FKSQ_PZJE', name: '批准金额' },
      { id: 'FKSQ_YFKJE', name: '已付款金额' },
      { id: 'FKSQ_SJFKRQ', name: '实际付款日期' },
      { id: 'SFKMX_SFKJE', name: '收付款金额' },
      { id: 'FKSQ_SXF', name: '手续费' },
      { id: 'GCXM_XMMC', name: '项目' },
      { id: 'FKSQ_XH', name: '付款计划序号' },
      { id: 'FKSQ_WFPNAME', name: '工作流状态' },
      { id: 'FKSQ_WFWUSERNAME', name: '待处理人' },
      { id: 'FKSQ_WFHUSERNAME', name: '已处理人' },
      { id: 'FKSQ_SFKKM', name: '付款科目' },
      { id: 'FKSQ_SXFKM', name: '手续费科目' },
      { id: 'FKSQ_DFKM', name: '对方科目' },
      { id: 'SFKMX_XJLLXM', name: '现金流量项目' },
      { id: 'FKSQ_SKR', name: '收款人' },
      { id: 'FKSQ_SKRZH', name: '收款人账号' },
      { id: 'SFKMX_SKRKHH', name: '收款人开户行' },
      { id: 'FKSQ_BZ', name: '收款人账号' },
      { id: 'FKSQ_JSFS', name: '结算方式' },
      { id: 'FKSQ_PJBH', name: '票据编号' },
      { id: 'SFKMX_PJLX', name: '票据类型' },
      { id: 'FKSQ_PJXH', name: '票据序号' },
      { id: 'FKSQ_CPRQ', name: '出票日期' },
      { id: 'FKSQ_CPRZH', name: '出票人账号' },
      { id: 'SFKMX_SXF', name: '手续费' },
      { id: 'FKSQ_ZY', name: '摘要' },
      { id: 'FKSQ_GYSID', name: '供应商编码' },
      { id: 'GYSXX_JC', name: '供应商' },
      { id: 'FKSQ_FKYH', name: '付款银行' },
      { id: 'FKSQ_FKRY', name: '付款人员' },
      { id: 'FKSQ_GHFPID', name: '购货发票号' },
      { id: 'SFKMX_SFKID', name: '收付款单号' },
      { id: 'SFKMX_YWDX', name: '业务对象' },
      { id: 'SFKMX_YWDWMC', name: '业务单位名称' },
      { id: 'SFKMX_SFKRY', name: '经手人' },
      { id: 'FKSQ_BZ', name: '备注' },
      { id: 'FKSQ_WHR', name: '维护人' },
      { id: 'FKSQ_WHSJ', name: '维护时间' }
    ]
  },
  OA_GGXX: {
    PageType: 'Type01Page',
    MainContent: [
      { id: 'GGXX_GGBT', name: '标题' },
      { id: 'GGXX_GGNR', name: '内容', html: true },
      { id: 'GGXX_FBSJ', name: '发布时间' },
      { id: 'GGXX_BLTS', name: '保留天数' },
      { id: 'GGXX_WFPNAME', name: '工作流名称' },
      { id: 'GGXX_WFWUSERNAME', name: '待处理人' },
      { id: 'GGXX_WFHUSERNAME', name: '已处理人' },
      { id: 'GGXX_BZ', name: '备注' },
      { id: 'GGXX_WHR', name: '维护人' },
      { id: 'GGXX_WHSJ', name: '维护时间' }
    ]
  },
  CGJS_FKJH: {
    PageType: 'Type02Page',
    Collapsible: { id: 'CGFKJHGZL', name: '采购付款计划工作流' },
    MainContent: [
      { id: 'KJDW_JC', name: '会计单位' },
      { id: 'FKJH_BZRQ', name: '编制日期' },
      { id: 'FKJH_QSRQ', name: '起始日期' },
      { id: 'FKJH_JSRQ', name: '结束日期' },
      { id: 'HB_MC', name: '货币名称' },
      { id: 'FKJH_HL', name: '汇率' },
      { id: 'FKJH_QKJE', name: '欠款金额' },
      { id: 'FKJH_JHJE', name: '计划付款金额' },
      { id: 'FKJH_SPJE', name: '审批金额' },
      { id: 'FKJH_SQJE', name: '申请金额' },
      { id: 'FKJH_SJJE', name: '实际付款金额' },
      { id: 'FKJH_SCFS', name: '生成方式' },
      { id: 'FKJH_YFKM', name: '应付科目' },
      { id: 'FKJH_WFPNAME', name: '工作流状态' },
      { id: 'FKJH_WFWUSERNAME', name: '待处理人' },
      { id: 'FKJH_WFHUSERNAME', name: '已处理人' },
      { id: 'FKJH_BZ', name: '备注' },
      { id: 'FKJH_WHR', name: '维护人' },
      { id: 'FKJH_WHSJ', name: '维护时间' }
    ],
    DetailsCollapsible: { id: 'CGFKJHMX', name: '采购付款计划明细' },
    DetailsContent: {
      Title: { id: 'FKJHMX_SKDWMC', name: '名称' },
      Content: [
        { id: 'SFLX_MC', name: '付款类型' },
        { id: 'FKJHMX_JHFKRQ', name: '计划付款日期' },
        { id: 'FKJHMX_SJFKRQ', name: '实际付款日期' },
        { id: 'FKJHMX_QKJE', name: '欠款金额' },
        { id: 'FKJHMX_LDJE', name: '留底金额' },
        { id: 'FKJHMX_JHJE', name: '计划金额' },
        { id: 'FKJHMX_PJJE', name: '票据金额' },
        { id: 'FKJHMX_XJJE', name: '现金金额' },
        { id: 'FKJHMX_SPJE', name: '审批金额' },
        { id: 'FKJHMX_YSQJE', name: '已申请金额' },
        { id: 'FKJHMX_YFKJE', name: '已付款金额' },
        { id: 'FKJHMX_KSQJE', name: '可申请金额' },
        { id: 'FKJHMX_LJZFJE', name: '累计支付金额' },
        { id: 'GYSXX_FKBL', name: '票据付款比例' },
        { id: 'FKJHMX_ZT', name: '状态' },
        { id: 'FKJHMX_BZ', name: '备注' }
      ]
    }
  },
  KQ_GRKQ: {
    PageType: 'Type01Page',
    HeaderInfo: { MC_id: 'RYXX_MC', SJ_id: 'BM_BMMC' },
    MainContent: [
      { id: 'GRKQ_XMID', name: '考勤项目编码' },
      { id: 'KQXM_XMMC', name: '考勤项目名称' },
      { id: 'GRKQ_SY', name: '事由' },
      { id: 'GRKQ_KSSJ', name: '开始时间' },
      { id: 'GRKQ_KSSJ', name: '结束时间' },
      { id: 'GRKQ_WFPNAME', name: '工作流状态' },
      { id: 'GRKQ_BZ', name: '备注' },
      { id: 'GRKQ_WHR', name: '维护人' },
      { id: 'GRKQ_WHSJ', name: '维护时间' }
    ]
  },
  OA_CCSQ: {
    PageType: 'Type01Page',
    HeaderInfo: { MC_id: 'RYXX_MC', SJ_id: 'CCSQ_SQRQ' },
    MainContent: [
      { id: 'CCSQ_SQDID', name: '申请单号' },
      { id: 'BM_BMMC', name: '申请部门' },
      { id: 'CCSQ_FLID', name: '分类' },
      { id: 'CCSQ_ZT', name: '状态' },
      { id: 'GCXM_XMMC', name: '项目' },
      { id: 'CCSQ_QSSJ', name: '出差起始时间' },
      { id: 'CCSQ_JSSJ', name: '出差结束时间' },
      { id: 'CCSQ_MDD', name: '目的地' },
      { id: 'CCSQ_CCSY', name: '出差事由', html: true },
      { id: 'CCSQ_CCMB', name: '出差目标' },
      { id: 'CCSQ_BZ', name: '备注' },
      { id: 'CCSQ_WHR', name: '维护人' },
      { id: 'CCSQ_WHSJ', name: '维护时间' }
    ]
  },
  XS_FYJHSP: {
    PageType: 'Type02Page',
    Collapsible: { id: 'FYJH', name: '发运计划' },
    MainContent: [
      { id: 'SOFH_JHDID', name: '交货单号' },
      { id: 'SOFH_YWRQ', name: '交货单日期' },
      { id: 'BM_BMMC', name: '销售部门' },
      { id: 'XSYMC', name: '销售员' },
      { id: 'KHXX_JC', name: '订货单位' },
      { id: 'SOFH_HTID', name: '合同号' },
      { id: 'GCXM_XMMC', name: '项目名称' },
      { id: 'SOFH_YSFS', name: '运输方式' },
      { id: 'SOFH_JHFHRQ', name: '计划发货日期' },
      { id: 'SOFH_JHDD', name: '交货地址' },
      { id: 'SOFH_LXR', name: '联系人' },
      { id: 'SOFH_QKFH', name: '欠款发货' },
      { id: 'SOFH_AHTFK', name: '按合同付款' },
      { id: 'SOFH_BZ', name: '备注' }
    ],
    DetailsCollapsible: { id: 'XGMX', name: '相关明细' },
    DetailsContent: {
      Content: [
        { id: 'WLXX_MC', name: '物料名称' },
        { id: 'WLXX_GG', name: '规格' },
        { id: 'SOFHMX_WLPH', name: '批号' },
        { id: 'SOFHMX_JHSL', name: '计划数量' }
      ]
    }
  },
  CG_XQSQSP: {
    PageType: 'Type02Page',
    Collapsible: { id: 'XQD', name: '需求单' },
    MainContent: [
      { id: 'XQSQ_SQDID', name: '需求申请单号' },
      { id: 'SQBMMC', name: '部门' },
      { id: 'XQSQ_CGBMID', name: '采购部门' },
      { id: 'XQSQ_SQR', name: '申请人' },
      { id: 'XQSQ_BZ', name: '备注' }
    ],
    DetailsCollapsible: { id: 'XQDMX', name: '需求单明细' },
    DetailsContent: {
      Content: [
        { id: 'XQSQMX_XH', name: '序号' },
        { id: 'XQSQMX_ZLH', name: '制令号' },
        { id: 'XQSQMX_WLID', name: '物料编码' },
        { id: 'WLXX_MC', name: '物料名称' },
        { id: 'XQSQMX_XQSL', name: '需求数量' },
        { id: 'XQSQMX_FXQSL', name: '辅助需求数量' },
        { id: 'WLXX_FZJLDW', name: '辅助计量单位' },
        { id: 'XQSQMX_BZ', name: '备注' }
      ]
    }
  },
  HCP_ZYFS_YWTC: {
    PageType: 'Type02Page',
    Collapsible: { id: 'TCD', name: '提成单' },
    MainContent: [
      { id: 'H_YWTC_TCID', name: '提成编码' },
      { id: 'H_YWTC_YEAR', name: '年度' },
      { id: 'H_YWTC_MONTH', name: '月份' },
      { id: 'H_YWTC_TCZSL', name: '合计出库数量' },
      { id: 'BM_BMMC', name: '部门' },
      { id: 'H_XSTCMX_TCBL', name: '提成比例' },
      { id: 'H_XSTCMX_DJBL', name: '低于限价的提成比例' },
      { id: 'H_YWTC_TCZJE', name: '合计提成金额' }
    ],
    DetailsCollapsible: { id: 'TCMX', name: '提成明细' },
    DetailsContent: {
      Content: [
        { id: 'H_YWTCMX_XH', name: '序号' },
        { id: 'SOMX_ZLH', name: '制令号' },
        { id: 'H_YWTCMX_SJXSSBJ', name: '实收设备价' },
        { id: 'H_YWTCMX_JBSBJ', name: '厂收标准价' },
        { id: 'H_YWTCMX_XSSBJ', name: '协议价格' },
        { id: 'H_YWTCMX_TCBL', name: '合同价格' },
        { id: 'H_YWTCMX_TCBL', name: '提成比例' },
        { id: 'H_YWTCMX_YWTC', name: '业务提成' },
        { id: 'H_YWTCMX_CE', name: '超额' },
        { id: 'H_YWTCMX_TCZE', name: '提成总额' },
        { id: 'H_YWTCMX_SJTCZE', name: '实际提成总额' },
        { id: 'H_YWTCMX_BZ', name: '备注' }
      ]
    }
  },
  FYBX_SWSQ: {
    PageType: 'Type02Page',
    Collapsible: { id: 'SWSQ', name: '事务申请' },
    MainContent: [
      { id: 'SWSQ_SWLX', name: '事务类型' },
      { id: 'SWSQ_SWID', name: '事务编号' },
      { id: 'SWSQ_ZT', name: '状态' },
      { id: 'SWSQ_SQRQ', name: '申请日期' },
      { id: 'SWSQ_QSRQ', name: '执行起始日期' },
      { id: 'SWSQ_ZZRQ', name: '执行终止日期' },
      { id: 'SWSQ_WFWUSERNAME', name: '待处理人' },
      { id: 'SWSQ_WFHUSERNAME', name: '已处理人' },
      { id: 'SWSQ_CYRYMC', name: '参与人员' },
      { id: 'RYXX_MC', name: '申请人' },
      { id: 'BM_BMMC', name: '申请部门' },
      { id: 'SWSQ_SQSY', name: '申请事由', lines: 4 },
      { id: 'SWSQ_BZ', name: '备注' },
      { id: 'SWSQ_WHR', name: '维护人' },
      { id: 'SWSQ_WHSJ', name: '维护时间' }
    ],
    DetailsCollapsible: { id: 'XGMX', name: '相关明细' },
    DetailsContent: {
      Content: [
        { id: 'SWSQSH_XH', name: '序号' },
        { id: 'SWSQSH_SHYJSM', name: '审核部门' },
        { id: 'RYXX_MC', name: '审核人' },
        { id: 'SWSQSH_SHSJ', name: '审核时间' },
        { id: 'SWSQSH_SHYJSM', name: '审核意见', lines: 4 }
      ]
    }
  },
  FYBX_WZLYSQ: {
    PageType: 'Type02Page',
    Collapsible: { id: 'WZLYSQ', name: '物资领用申请' },
    MainContent: [
      { id: 'KJDW_JC', name: '会计单位' },
      { id: 'FYLX_MC', name: '费用单类型' },
      { id: 'WZLYSQ_SWID', name: '事务编号' },
      { id: 'WZLYSQ_SQID', name: '申请单号' },
      { id: 'WZLYSQ_SQRQ', name: '申请日期' },
      { id: 'WZLYSQ_QSRQ', name: '执行起始日期' },
      { id: 'WZLYSQ_ZZRQ', name: '执行终止日期' },
      { id: 'WZLYSQ_ZT', name: '状态' },
      { id: 'WZLYSQ_WFWUSERNAME', name: '待处理人' },
      { id: 'WZLYSQ_WFHUSERNAME', name: '已处理人' },
      { id: 'WZLYSQ_SYRYMC', name: '使用人员' },
      { id: 'RYXX_MC', name: '申请人' },
      { id: 'BM_BMMC', name: '申请部门' },
      { id: 'WZLYSQ_SQSY', name: '申请事由', lines: 4 },
      { id: 'WZLYSQ_BZ', name: '备注' },
      { id: 'WZLYSQ_LYDID', name: '领用单号' },
      { id: 'WZLYSQ_WHR', name: '维护人' },
      { id: 'WZLYSQ_WHSJ', name: '维护时间' }
    ],
    DetailsCollapsible: { id: 'XGMX', name: '相关明细' },
    DetailsContent: {
      Content: [
        { id: 'WZLYSQMX_XH', name: '序号' },
        { id: 'WZLYSQMX_ZLH', name: '制令号' },
        { id: 'WZLYSQMX_XQSL', name: '需求数量' },
        { id: 'WZLYSQMX_XQRQ', name: '需求日期' },
        { id: 'WZLYSQMX_BZ', name: '备注' }
      ]
    }
  },
  HCP_ZYFS_SOFKTJBG: {
    PageType: 'Type02Page',
    Collapsible: { id: 'SOFKTJBG', name: '付款承诺函' },
    MainContent: [
      { id: 'H_SOFKTJBG_BGID', name: '变更编码' },
      { id: 'KHXX_JC', name: '客户名称' },
      { id: 'KHXX_XDJE', name: '借贷额度' },
      { id: 'KHXX_DZ', name: '客户地址' },
      { id: 'KHXX_TEL', name: '客户电话' },
      { id: 'KHXX_FRDB', name: '法人代表' },
      { id: 'KHQK', name: '客户总欠款' }
    ],
    DetailsCollapsible: { id: 'XGMX', name: '相关明细' },
    DetailsContent: {
      Content: [
        { id: 'SOMX_ZLH', name: '工号' },
        { id: 'ZJ', name: '合同总价' },
        { id: 'XYJG', name: '协议价' },
        { id: 'HKJE', name: '收款合计' },
        { id: 'YSJE', name: '应收金额' },
        { id: 'ZK', name: '折扣' }
      ]
    },
    Details1Collapsible: { id: 'XGMX', name: '相关明细' },
    Details1TableContent: {
      Content: [
        { id: 'BGBEFORE', name: '变更前', GHID: 'zlhIndex', GHNAME: '工号' },
        { id: 'BGAFTER', name: '变更后', GHID: 'zlhIndex', GHNAME: '工号' }
      ],
      TableContent: [
        { id: 'SKLX_MC', name: '收款类型' },
        { id: 'YSK', name: '应收金额' },
        { id: 'YSKRQ', name: '应收日期' }
      ]
    }
  },
  HCP_ZYFS_XSSK: {
    PageType: 'Type02Page',
    Collapsible: { id: 'ZYXSSK', name: '住友销售收款' },
    MainContent: [
      { id: 'XSSK_SKID', name: '收款单号' },
      { id: 'XSSK_FLID', name: '收款类型' },
      { id: 'XSSK_YEAR', name: '年度' },
      { id: 'XSSK_MONTH', name: '月份' },
      { id: 'XSSK_BMID', name: '销售部门' },
      { id: 'BM_BMMC', name: '部门名称' },
      { id: 'KJDW_JC', name: '会计单位名称' },
      { id: 'KHMC', name: '客户名称' },
      { id: 'FKDWMC', name: '付款单位名称' },
      { id: 'XSYMC', name: '销售员名称' },
      { id: 'SKRMC', name: '收款人名称' },
      { id: 'XSSK_SKRQ', name: '收款日期' },
      { id: 'HB_MC', name: '货币名称' },
      { id: 'XSSK_HL', name: '汇率' },
      { id: 'XSSK_JSFS', name: '结算方式' },
      { id: 'XSSK_ZJE', name: '总金额' },
      { id: 'GCXM_XMMC', name: '项目名称' },
      { id: 'XSSK_LYLX', name: '来源类型' },
      { id: 'XSSK_BZ', name: '备注' },
      { id: 'XSSK_WHR', name: '维护人' },
      { id: 'XSSK_WHSJ', name: '维护时间' },
      { id: 'DFKMMC', name: '货方科目名称' },
      { id: 'XSSK_NBPZH', name: '内部凭证号' },
      { id: 'XSSK_YNBPZH', name: '原内部凭证号' },
      { id: 'XSSK_JZRQ', name: '记账日期' },
      { id: 'SKKMMC', name: '收款科目名称' },
      { id: 'SXFKMMC', name: '手续费科目名称' },
      { id: 'XSSK_WFINST', name: '工作流实例号' },
      { id: 'XSSK_WFPNAME', name: '工作流状态名称' },
      { id: 'XSSK_WFWUSERNAME', name: '待处理人' },
      { id: 'XSSK_WFHUSERNAME', name: '已处理人' },
      { id: 'H_XSSK_CQ', name: '超期' },
      { id: 'SFLX_MC', name: '类型' }
    ],
    DetailsCollapsible: { id: 'SKMX', name: '收款明细' },
    DetailsContent: {
      Content: [
        { id: 'XSSKMX_MXXH', name: '序号' },
        { id: 'XSSKMX_SKID', name: '收款单号' },
        { id: 'SFLX_MC', name: '收付类型名称' },
        { id: 'SKLX_MC', name: '收款类型名称' },
        { id: 'XSSKMX_PJLX', name: '票据类型' },
        { id: 'SFPJ_PJFLMC', name: '票据分类名称' },
        { id: 'XSSKMX_PJID', name: '票据编号' },
        { id: 'XSSKMX_PJXH', name: '票据序号' },
        { id: 'XSSKMX_CPRQ', name: '出票日期' },
        { id: 'XSSKMX_CPRZH', name: '出票人账号' },
        { id: 'XSSKMX_FKH', name: '付款行全称' },
        { id: 'XSSKMX_SKJE', name: '收款金额' },
        { id: 'XSSKMX_SXF', name: '手续费' },
        { id: 'XSSKMX_ZJE', name: '总金额' },
        { id: 'XSSKMX_ZY', name: '摘要' },
        { id: 'SXFKMMC', name: '手续费科目名称' },
        { id: 'SKKMMC', name: '收款科目名称' },
        { id: 'XSSKMX_XJLLXM', name: '现金流量项目' },
        { id: 'XSSKMX_BZ', name: '备注' },
        { id: 'XSSKMX_YHXJE', name: '已核销金额' }
      ]
    },
    Details1Collapsible: { id: 'QDMX', name: '清单明细' },
    Details1Content: {
      Content: [
        { id: 'XSSKQD_MXXH', name: '明细序号' },
        { id: 'XSSKQD_SKID', name: '收款单号' },
        { id: 'SKLX_MC', name: '收款类型名称' },
        { id: 'XSSKQD_PJLX', name: '票据类型' },
        { id: 'SFPJ_PJFLMC', name: '票据分类名称' },
        { id: 'XSSKQD_PJID', name: '票据编号' },
        { id: 'XSSKQD_PJXH', name: '票据序号' },
        { id: 'XSSKQD_CPRQ', name: '出票日期' },
        { id: 'XSSKQD_CPRZH', name: '出票人账号' },
        { id: 'XSSKQD_FKH', name: '付款行全称' },
        { id: 'XSSKQD_SKJE', name: '收款金额' },
        { id: 'XSSKQD_SXF', name: '手续费' },
        { id: 'XSSKQD_ZJE', name: '总金额' },
        { id: 'XSSKQD_ZY', name: '摘要' },
        { id: 'XSSKQD_LYLX', name: '来源类型' },
        { id: 'XSSKQD_LYDID', name: '来源单号' },
        { id: 'XSSKQD_LYDXH', name: '来源单序号' },
        { id: 'XSSKQD_YHXJE', name: '已核销金额' },
        { id: 'XSSKQD_SFKID', name: '收付款单号' },
        { id: 'XSSKQD_SFKXH', name: '收付款序号' }
      ]
    }
  },
  XSJS_QTKPSQ: {
    PageType: 'Type02Page',
    Collapsible: { id: 'QTKPSQ', name: '其他开票申请审批' },
    MainContent: [
      { id: 'QTKP_SQDID', name: '申请单号' },
      { id: 'YSDLX_MC', name: '应收单类型' },
      { id: 'QTKP_CKID', name: '仓库编码' },
      { id: 'CK_MC', name: '仓库名称' },
      { id: 'QTKP_JSCK', name: '结算仓库编码' },
      { id: 'BM_BMMC', name: '销售部门' },
      { id: 'KJDW_JC', name: '会计单位' },
      { id: 'KHXX_JC', name: '客户' },
      { id: 'KPDWMC', name: '开票单位' },
      { id: 'FKDWMC', name: '付款单位' },
      { id: 'RYXX_MC', name: '销售员' },
      { id: 'QTKP_YEAR', name: '年度' },
      { id: 'QTKP_MONTH', name: '月份' },
      { id: 'QTKP_YWRQ', name: '业务日期' },
      { id: 'QTKP_DQRQ', name: '到期日期' },
      { id: 'QTKP_HBID', name: '货币' },
      { id: 'QTKP_HL', name: '汇率' },
      { id: 'QTKP_JSFS', name: '结算方式' },
      { id: 'QTKP_YSJE', name: '应收金额' },
      { id: 'GCXM_XMMC', name: '项目' },
      { id: 'QTKP_SWLX', name: '事物类型' },
      { id: 'QTKP_YSDID', name: '应收单号' },
      { id: 'QTKP_WFWUSERNAME', name: '待处理人' },
      { id: 'QTKP_WFHUSERNAME', name: '已处理人' },
      { id: 'QTKP_BZ', name: '备注' },
      { id: 'QTKP_WHR', name: '维护人' },
      { id: 'QTKP_WHSJ', name: '维护时间' },
      { id: 'QTKP_SCFS', name: '生成方式' }
    ],
    DetailsCollapsible: { id: 'MX', name: '明细' },
    DetailsContent: {
      Content: [
        { id: 'QTKPMX_SQDXH', name: '序号' },
        { id: 'WLXX', name: '物料' },
        { id: 'QTKPMX_JLDW', name: '计量单位' },
        { id: 'QTKPMX_XSSL', name: '销售数量' },
        { id: 'QTKPMX_HSSL', name: '换算数量' },
        { id: 'QTKPMX_HSXS', name: '换算系数' },
        { id: 'QTKPMX_SL', name: '税率' },
        { id: 'QTKPMX_HSJG', name: '含税价格' },
        { id: 'QTKPMX_HSJE', name: '含税金额' },
        { id: 'QTKPMX_WSJG', name: '无税价格' },
        { id: 'QTKPMX_WSJE', name: '无税金额' },
        { id: 'QTKPMX_SE', name: '税额' },
        { id: 'QTKPMX_ZJE', name: '总金额' },
        { id: 'QTKPMX_BZ', name: '备注' }
      ]
    }
  },
  FYBX_FYDJ: {
    PageType: 'Type02Page',
    Collapsible: { id: 'FYDJ', name: '费用登记' },
    MainContent: [
      { id: 'FYDJ_DJID', name: '费用单号' },
      { id: 'KJDW_JC', name: '会计单位' },
      { id: 'FYLX_MC', name: '费用单类型' },
      { id: 'FYDJ_QSRQ', name: '执行起始时间' },
      { id: 'FYDJ_ZZRQ', name: '执行终止时间' },
      { id: 'FYDJ_BXRQ', name: '报销日期' },
      { id: 'RYXX_MC', name: '报销人' },
      { id: 'BM_BMMC', name: '报销部门' },
      { id: 'FYDJ_BXSY', name: '报销事由' },
      { id: 'FYDJ_ZFDX', name: '支付对象' },
      { id: 'ZFDXMC', name: '支付对象名称' },
      { id: 'FYDJ_CYRYMC', name: '参与人员' },
      { id: 'FYDJ_BXZE', name: '报销总额' },
      { id: 'FYDJ_ZFJE', name: '支付总额' },
      { id: 'FYDJ_SSLB', name: '所属类别' },
      { id: 'FYDJ_SWID', name: '事物编号' },
      { id: 'FYDJ_ZT', name: '状态' },
      { id: 'FYDJ_BZ', name: '备注' },
      { id: 'FYDJ_WHR', name: '维护人' },
      { id: 'FYDJ_WHSJ', name: '维护时间' },
      { id: 'FYDJ_WFWUSERNAME', name: '待处理人' },
      { id: 'FYDJ_WFHUSERNAME', name: '已处理人' }
    ],
    DetailsCollapsible: { id: 'MX', name: '明细' },
    DetailsContent: {
      Content: [
        { id: 'FYDJMX_XH', name: '序号' },
        { id: 'FYXM_XMMC', name: '费用项目' },
        { id: 'HB_MC', name: '货币' },
        { id: 'FYDJMX_QSRQ', name: '执行起始日期' },
        { id: 'FYDJMX_ZZRQ', name: '执行终止日期' },
        { id: 'FYDJMX_FPJE', name: '发票金额' },
        { id: 'FYDJMX_SQBXJE', name: '申请报销金额' },
        { id: 'FYDJMX_BXBZ', name: '报销标准' },
        { id: 'FYDJMX_BZ', name: '备注' }
      ]
    }
  },
  FYBX_WZLYDJ: {
    PageType: 'Type02Page',
    Collapsible: { id: 'WZLYDJ', name: '物资领用登记' },
    MainContent: [
      { id: 'KJDW_JC', name: '会计单位' },
      { id: 'FYLX_MC', name: '费用单类型' },
      { id: 'WZLYDJ_SWID', name: '事物编号' },
      { id: 'WZLYDJ_DJID', name: '领用单号' },
      { id: 'WZLYDJ_LYRQ', name: '领用日期' },
      { id: 'WZLYDJ_QSRQ', name: '执行起始日期' },
      { id: 'WZLYDJ_ZZRQ', name: '执行终止日期' },
      { id: 'RYXX_MC', name: '领用人' },
      { id: 'BM_BMMC', name: '领用部门' },
      { id: 'WZLYDJ_SYRYMC', name: '使用人员' },
      { id: 'WZLYDJ_LYSY', name: '领用事由' },
      { id: 'WZLYDJ_ZT', name: '状态' },
      { id: 'WZLYDJ_BZ', name: '备注' },
      { id: 'WZLYDJ_SQID', name: '申请单号' },
      { id: 'WZLYDJ_WHR', name: '维护人' },
      { id: 'WZLYDJ_WHSJ', name: '维护时间' },
      { id: 'WZLYDJ_WFWUSERNAME', name: '待处理人' },
      { id: 'WZLYDJ_WFHUSERNAME', name: '已处理人' }
    ],
    DetailsCollapsible: { id: 'MX', name: '明细' },
    DetailsContent: {
      Content: [
        { id: 'WZLYDJMX_XH', name: '序号' },
        { id: 'WZLYDJMX_WLXX', name: '物料信息' },
        { id: 'WZLYDJMX_WLPH', name: '物料批号' },
        { id: 'WZLYDJMX_XQSL', name: '需求数量' },
        { id: 'WZLYDJMX_YFSL', name: '应发数量' },
        { id: 'WZLYDJMX_LYSL', name: '领用数量' },
        { id: 'WZLYDJMX_SYRMC', name: '使用人' },
        { id: 'WZLYDJMX_XQID', name: '需求单号' },
        { id: 'FYXM_XMMC', name: '项目费用' },
        { id: 'WZLYDJMX_BZ', name: '备注' }
      ]
    }
  },
  default: {
    PageType: 'DefaultPage',
    MainContent: [
      { id: 'WFAWT_PNAME', name: '状态' },
      { id: 'WFAWT_PUSER', name: '上步处理人' },
      { id: 'WFAWT_BEGIN', name: '处理时间' },
      {
        id: 'ContentCards',
        values: [{ id: 'WFAWT_TITLE', name: '标题' }]
      }
    ]
  }
}
