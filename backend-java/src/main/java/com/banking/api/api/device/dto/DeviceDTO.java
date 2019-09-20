package com.banking.api.api.device.dto;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.io.Serializable;

@ApiModel(value = "Device info" ,description = "Device info")
@Getter
@Setter
@NoArgsConstructor
public class DeviceDTO implements Serializable {

	private long deviceId;
	private String deviceName;

//	@Builder
//	@QueryProjection
//	public InstagramDTO(long rank, long follower, String name, String display, String instagramId, String thumbnail,long beforeRank) {
//		this.rank = rank;
//		this.follower = follower;
//		this.name = name;
//		this.display = display;
//		this.instagramId = instagramId;
//		this.thumbnail = thumbnail;
//		this.beforeRank = beforeRank;
//	}
}