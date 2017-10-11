package com.xiaoma.universe.shopping.enums;

public class Constants {
	/**
	 * @Title: 来源
	 * @Description:
	 * @author xiaoma
	 * @since 2016年12月26日
	 * @version V1.0
	 */
	public enum DeviceType {
		web(0, "web"), h5(1, "h5"), android(2, "android"), ios(3, "ios普通版"), iosappstore(4, "ios商店版");

		private int type;
		private String name;

		private DeviceType(int type, String name) {
			this.type = type;
			this.name = name;
		}

		public int getType() {
			return type;
		}

		public String getName() {
			return name;
		}
	}

	/**
	 * @Title: 支付方式
	 * @Description:
	 * @author xiaoma
	 * @since 2016年12月26日
	 * @version V1.0
	 */
	public enum PaymentType {
		wallet(1900, "钱包支付"), alipay(1901, "支付宝"), wxpay(1902, "微信支付"), iap(1903, "苹果支付"), unionpay(1904, "银联支付"), chinabank(1905, "网银在线");
		private int type;
		private String name;

		private PaymentType(int type, String name) {
			this.type = type;
			this.name = name;
		}

		public int getType() {
			return type;
		}

		public String getName() {
			return name;
		}

		public static PaymentType getPaymentType(int type) {
			for (PaymentType paymentType : PaymentType.values()) {
				if (paymentType.getType() == type) {
					return paymentType;
				}
			}
			return null;
		}
	}
}
