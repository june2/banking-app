package com.banking.unit;

import com.banking.common.Banking;
import org.junit.Test;


public class BankingTest {

	@Test
	public void bankingTest() {
		Banking banking = new Banking();
		banking.init();
	}

}
