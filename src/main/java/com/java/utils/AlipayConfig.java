package com.java.utils;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101900723087";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJZrj1gQ2XIjMBQdA+V11v7uAtsGG9nBOVHHi8GdcHk9IPrj6qen1v231HI9CsRcM7BvGl0sdHP0nKi+/UFAR6xaA+dEcwoWoDbiCA/t7OUqsMPPBsdyab/RRpHNua6yLYtYU/aMpeP4jNVgvMFFesNdOJKeZR98lJUJCwg884VqDmSSGQwoA5dBQMGaQhr7WyuCQXTbqStXDnaOlC+1UkMZCg/px3RMsPW2WD4Dg1g/3xE3s4Z8AcPTBtG/zZP2YiHnrt24ZgZ9wa0CvtdoC+TqcRlSQ+TDcyK2LbO4MOJUQTu7q6wqpFU+L7MYS8Qe4wcWUZrJmVYYuSmHASnLH/AgMBAAECggEAM22ep1o3/TLHcXe71F98xZtq9V/H5aIYQghOMEIs7YtqpYRqDiBPLaQPnn3fyE3cJ5ODW0OyjVf04NrQ+AfQiQU0AR6yGxHsv0l81VO/01G6ydo5zoiyfDyo3Jp43VtTv6DCkMmSe3Sf20cwpgE/zgLErI7deGrcpHMFL33JCWpo+afVH+eIZN0u19DMl4bLxtxwEGmzq/CXPqw4xiokkyxyllxBciSZG0SvwfZBs7vh3FbDyliLDof9RF4wedZwdHmI+H3VRdM2Js/tpTe+wpT5zpsoL4y0+u1WrcXLk11sKjjUOGljYHIEiN1K8TEHr/u7QGU9RlvMiJoyAaBruQKBgQD8TqDIlT6ORao1w1eVdDcN9VM1yo7kjmTegPV9nZwgSdsqRUod3Uufjh4MtAQ3wo9FokzGDf2OoPGnPFZ36/vV6qd9rhqYlY62iNBXIfxJnVx/pkkK+pqUe3qwEq1jEj6Guce5NsVavwj2w3E+KlpoQt3rXl2V3O8RzWXVDQlu8wKBgQDMWVrPHLNQ9SgO4jnQQn3SMez4gV8mdJe/TxmeXajWFNV+ST5fNJElBVW3EFo9dGpgpqJb/wLmXu7mDgotA08AUQLsBh3RTHw7PwaSATILCXQNc2PbygVdZFcP9RvhJ9XMJjfEH7jINRayt5PqoDka/Ap4L0j+ERAtTvBEaUqrxQKBgFY/fqDyu66gy92TCCaT0poX6bjypEQnFP4msUSekxdKh/v8Majh1A8X4tfO1b5F6PoR0BLIB4wxIkpbyuc1qSHoFBdXY8oTHfTx8d5HRNnZTBxquH9jSWJGj5sO12yNeQhPC6IZwf8SXLsV9mkcy0jmyrvBx1YKb0LzpsLcsQPXAoGAQwEVjo25mlUYcnDpRglXWkG2kvFQsrpOO5ODMfNB9hhUvJjlk7AX24y5Q1JgVIBElTZuTD38xG7iZJq76XCJSfBGRf/nbQZoQcDztZIgx4+s9vAcEShXw/yvs3LKVnSKXOs3I97G5xbJP4aEQM2Si++Suz+97ljH9iNJExV3P4UCgYBwMRVhuPpZPuW5Bd5ynybEVSPpLDBX3o9xPnakKo2qz0MTaK3TITd0Ah+6rb/g9fyO0l4Jq1s4MxeniChmqWDbX+6hknMOi5ZMCm45vKinEA7lwIolPWA0FjstZhRL+gjyLT1kbsvAZJFcx3DnY3b25uiOmuxBzxuJQafwDhCBUA==";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyWa49YENlyIzAUHQPlddb+7gLbBhvZwTlRx4vBnXB5PSD64+qnp9b9t9RyPQrEXDOwbxpdLHRz9Jyovv1BQEesWgPnRHMKFqA24ggP7ezlKrDDzwbHcmm/0UaRzbmusi2LWFP2jKXj+IzVYLzBRXrDXTiSnmUffJSVCQsIPPOFag5kkhkMKAOXQUDBmkIa+1srgkF026krVw52jpQvtVJDGQoP6cd0TLD1tlg+A4NYP98RN7OGfAHD0wbRv82T9mIh567duGYGfcGtAr7XaAvk6nEZUkPkw3Miti2zuDDiVEE7u6usKqRVPi+zGEvEHuMHFlGayZlWGLkphwEpyx/wIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 支付成功后的页面回调 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8090/order/myOrderPay";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

