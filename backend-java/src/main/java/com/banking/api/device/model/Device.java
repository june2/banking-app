package com.banking.api.device.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Setter
@Getter
@Data
@Builder
@Entity
@AllArgsConstructor()
@NoArgsConstructor()
@Table(name = "device")
public class Device implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private Long deviceId;
	private String deviceName;
}