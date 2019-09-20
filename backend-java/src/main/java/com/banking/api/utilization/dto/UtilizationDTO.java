package com.banking.api.utilization.dto;

import com.banking.api.device.model.Device;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@ApiModel(value = "Utilization info", description = "Utilization info")
@Getter
@Setter
public class UtilizationDTO implements Serializable {

    private long id;
    private Device device;
    private long year;
    private float rate;

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