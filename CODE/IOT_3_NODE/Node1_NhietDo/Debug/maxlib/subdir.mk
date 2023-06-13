################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
C:/Users/Admin/Desktop/maxlib/MAX31865_lib.c 

OBJS += \
./maxlib/MAX31865_lib.o 

C_DEPS += \
./maxlib/MAX31865_lib.d 


# Each subdirectory must supply rules for building sources it contributes
maxlib/MAX31865_lib.o: C:/Users/Admin/Desktop/maxlib/MAX31865_lib.c
	@echo 'Building file: $<'
	@echo 'Invoking: MCU GCC Compiler'
	@echo $(PWD)
	arm-none-eabi-gcc -mcpu=cortex-m3 -mthumb -mfloat-abi=soft -std=c99 -DUSE_HAL_DRIVER -DSTM32F103xB -I"C:/Users/Admin/Desktop/test/ssacc/Core/Inc" -I"C:/Users/Admin/Desktop/test/ssacc/Drivers/STM32F1xx_HAL_Driver/Inc" -I"C:/Users/Admin/Desktop/test/ssacc/Drivers/STM32F1xx_HAL_Driver/Inc/Legacy" -I"C:/Users/Admin/Desktop/test/ssacc/Drivers/CMSIS/Device/ST/STM32F1xx/Include" -I"C:/Users/Admin/Desktop/test/ssacc/Drivers/CMSIS/Include" -I"C:/Users/Admin/Desktop/maxlib"  -Og -g3 -Wall -fmessage-length=0 -ffunction-sections -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


