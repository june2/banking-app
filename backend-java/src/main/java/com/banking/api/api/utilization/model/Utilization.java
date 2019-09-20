package com.banking.api.api.utilization.model;

import com.banking.api.api.device.model.Device;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Setter
@Getter
@Data
@Builder
@Entity
@AllArgsConstructor()
@NoArgsConstructor()
@Table(name = "utilization")
public class Utilization implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private long id;
	private long year;
	private float rate;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "deviceId")
	private Device device;
}