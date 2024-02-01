BITS 32
org 43EFEFh

mov eax,[0x71a06c]  ;Update currentCarTrackPosition
mov [0x6365e4],eax
mov dword [dword 0x6365ec],0x0  ;Zero botCarCreationMapPosition??

cmp dword [dword 0x62389c],byte +0x2
jnz near 0x43f0ca
mov dword [dword 0x614c4c],0x0

mov eax,[0x6365e4]
add eax,[dword 0x614c4c]
mov [0x614c50],eax
lea esi,[dword 0x7103cc]
call 0x43f0df
jc short 0x43f053
lea esi,[dword 0x7113ac]
call 0x43f0df
jc short 0x43f053
lea esi,[dword 0x71238c]
call 0x43f0df
jc short 0x43f053
jmp short 0x43f0c0
neg dword [dword 0x614c4c]
mov eax,[0x6365e4]
add eax,[dword 0x614c4c]
mov [0x614c50],eax
lea esi,[dword 0x7103cc]
call 0x43f0df
jc short 0x43f092
lea esi,[dword 0x7113ac]
call 0x43f0df
jc short 0x43f092
lea esi,[dword 0x71238c]
call 0x43f0df
jc short 0x43f092
jmp short 0x43f0c0
neg dword [dword 0x614c4c]
inc dword [dword 0x614c4c]
cmp dword [dword 0x614c4c],byte +0x40
jnz near 0x43f01a
pusha
lea eax,[dword 0x4dbb01]
call 0x40142b
popa
sub dword [dword 0x71a1c0],byte +0x64
ret
mov eax,[0x614c50]
mov [0x6365e4],eax
call 0x44666f
call 0x43fb00
mov dword [dword 0x71af84],0xa

ret
