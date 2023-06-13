/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file    stm32f1xx_it.c
  * @brief   Interrupt Service Routines.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2023 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */

/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "stm32f1xx_it.h"
/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN TD */

/* USER CODE END TD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
/* USER CODE BEGIN PV */

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
extern char receive[15];
extern char charToTransmit[15];
/* USER CODE END 0 */

/* External variables --------------------------------------------------------*/
extern UART_HandleTypeDef huart1;
/* USER CODE BEGIN EV */

/* USER CODE END EV */

/******************************************************************************/
/*           Cortex-M3 Processor Interruption and Exception Handlers          */
/******************************************************************************/
/**
  * @brief This function handles Non maskable interrupt.
  */
void NMI_Handler(void)
{
  /* USER CODE BEGIN NonMaskableInt_IRQn 0 */

  /* USER CODE END NonMaskableInt_IRQn 0 */
  /* USER CODE BEGIN NonMaskableInt_IRQn 1 */
  while (1)
  {
  }
  /* USER CODE END NonMaskableInt_IRQn 1 */
}

/**
  * @brief This function handles Hard fault interrupt.
  */
void HardFault_Handler(void)
{
  /* USER CODE BEGIN HardFault_IRQn 0 */

  /* USER CODE END HardFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_HardFault_IRQn 0 */
    /* USER CODE END W1_HardFault_IRQn 0 */
  }
}

/**
  * @brief This function handles Memory management fault.
  */
void MemManage_Handler(void)
{
  /* USER CODE BEGIN MemoryManagement_IRQn 0 */

  /* USER CODE END MemoryManagement_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_MemoryManagement_IRQn 0 */
    /* USER CODE END W1_MemoryManagement_IRQn 0 */
  }
}

/**
  * @brief This function handles Prefetch fault, memory access fault.
  */
void BusFault_Handler(void)
{
  /* USER CODE BEGIN BusFault_IRQn 0 */

  /* USER CODE END BusFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_BusFault_IRQn 0 */
    /* USER CODE END W1_BusFault_IRQn 0 */
  }
}

/**
  * @brief This function handles Undefined instruction or illegal state.
  */
void UsageFault_Handler(void)
{
  /* USER CODE BEGIN UsageFault_IRQn 0 */

  /* USER CODE END UsageFault_IRQn 0 */
  while (1)
  {
    /* USER CODE BEGIN W1_UsageFault_IRQn 0 */
    /* USER CODE END W1_UsageFault_IRQn 0 */
  }
}

/**
  * @brief This function handles System service call via SWI instruction.
  */
void SVC_Handler(void)
{
  /* USER CODE BEGIN SVCall_IRQn 0 */

  /* USER CODE END SVCall_IRQn 0 */
  /* USER CODE BEGIN SVCall_IRQn 1 */

  /* USER CODE END SVCall_IRQn 1 */
}

/**
  * @brief This function handles Debug monitor.
  */
void DebugMon_Handler(void)
{
  /* USER CODE BEGIN DebugMonitor_IRQn 0 */

  /* USER CODE END DebugMonitor_IRQn 0 */
  /* USER CODE BEGIN DebugMonitor_IRQn 1 */

  /* USER CODE END DebugMonitor_IRQn 1 */
}

/**
  * @brief This function handles Pendable request for system service.
  */
void PendSV_Handler(void)
{
  /* USER CODE BEGIN PendSV_IRQn 0 */

  /* USER CODE END PendSV_IRQn 0 */
  /* USER CODE BEGIN PendSV_IRQn 1 */

  /* USER CODE END PendSV_IRQn 1 */
}

/**
  * @brief This function handles System tick timer.
  */
void SysTick_Handler(void)
{
  /* USER CODE BEGIN SysTick_IRQn 0 */

  /* USER CODE END SysTick_IRQn 0 */
  HAL_IncTick();
  /* USER CODE BEGIN SysTick_IRQn 1 */

  /* USER CODE END SysTick_IRQn 1 */
}

/******************************************************************************/
/* STM32F1xx Peripheral Interrupt Handlers                                    */
/* Add here the Interrupt Handlers for the used peripherals.                  */
/* For the available peripheral interrupt handler names,                      */
/* please refer to the startup file (startup_stm32f1xx.s).                    */
/******************************************************************************/

/**
  * @brief This function handles USART1 global interrupt.
  */
void USART1_IRQHandler(void)
{
  /* USER CODE BEGIN USART1_IRQn 0 */

  /* USER CODE END USART1_IRQn 0 */
  HAL_UART_IRQHandler(&huart1);
  /* USER CODE BEGIN USART1_IRQn 1 */
  static char receivedData[15];
  static uint8_t bufferIndex = 0;
  static char mang1[15];
  static char mang2[15];
  static char mang3[15];
  static char mangOF1[15];
  static char mangOF2[15];
  static char mangOF3[15];
  receivedData[bufferIndex++] = receive[0];
  if ( receive[0] == ' ') {
	  if(receivedData[0] == '1' && receivedData[2] == '4'){
    	  strcpy(mang1,receivedData);
      }
      else if(receivedData[0] == '2' && receivedData[2] == '4'){
    	  strcpy(mang2,receivedData);
      }
      else if(receivedData[0] == '4' && receivedData[2] == '1' && receivedData[4] == 'T'){
    	  if (strlen(mang1) == 0) {
    		  	  HAL_UART_Transmit(&huart1,receivedData, strlen(receivedData), 100);
    	      } else {
    	          HAL_UART_Transmit(&huart1, mang1, strlen(mang1), 100);
    	          memset(mang1, 0, 15);
    	      }
      }
      else if(receivedData[0] == '4' && receivedData[2] == '2' && receivedData[4] == 'D'){
    	  if (strlen(mang2) == 0) {
    		  	  HAL_UART_Transmit(&huart1,receivedData, strlen(receivedData), 100);
    	      } else {
    	          HAL_UART_Transmit(&huart1, mang2, strlen(mang2), 100);
    	          memset(mang2, 0, 15);
    	      }
      }
      else if(receivedData[0] == '4' && receivedData[2] == '3' && receivedData[4] == 'O'){
    	  HAL_GPIO_WritePin(GPIOB,GPIO_PIN_12,1);
      }
      else if(receivedData[0] == '4' && receivedData[2] == '3' && receivedData[4] == 'F'){
    	  HAL_GPIO_WritePin(GPIOB,GPIO_PIN_12,0);
      }
      else if(receivedData[0] == '4' && receivedData[2] == '1' && receivedData[4] == 'O'){
    	  HAL_UART_Transmit(&huart1, receivedData, strlen(receivedData), 100);
      }
      else if(receivedData[0] == '4' && receivedData[2] == '1' && receivedData[4] == 'F'){
          	  HAL_UART_Transmit(&huart1, receivedData, strlen(receivedData), 100);
            }
      else if(receivedData[0] == '4' && receivedData[2] == '2' && receivedData[4] == 'O'){
          	  HAL_UART_Transmit(&huart1, receivedData, strlen(receivedData), 100);
            }
	  else if(receivedData[0] == '4' && receivedData[2] == '2' && receivedData[4] == 'F'){
			  HAL_UART_Transmit(&huart1, receivedData, strlen(receivedData), 100);
			}
  	  bufferIndex = 0;
  	  memset(receivedData,0,15);

	  }
  HAL_UART_Receive_IT(&huart1,receive,1);


  /* USER CODE END USART1_IRQn 1 */
}

/* USER CODE BEGIN 1 */

/* USER CODE END 1 */
