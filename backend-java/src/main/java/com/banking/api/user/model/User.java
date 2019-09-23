package com.banking.api.user.model;

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
@Table(name = "user")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;
	@Column(unique=true)
	private String email;
	private String password;
	private String name;

}