BITS 32
org 437613
pusha
mov ebx,[dword 0x6051a0]
mov eax,[ebx*4+0x605034]
mov [0x71aa80],eax
popa
mov dword [dword 0x71a234],0x2

mov eax,[0x70f484]
add eax,ebx
mov [0x71a070],eax
mov [0x71a06c],eax
mov [0x71a074],eax
mov [0x6365e4],eax
mov [0x6365ec],eax
fild dword [dword 0x6051a0]
fild dword [dword 0x6051b4]
fsub dword [dword 0x5c5d38]
fsubr to st1
fdivp st1
fld dword [dword 0x6051a8]
fsub dword [dword 0x6051a4]
fmulp st1
fadd dword [dword 0x6051a4]
fst dword [dword 0x6051ac]
fstp dword [dword 0x71a650]
call 0x44666f
call 0x43fb47
mov dword [dword 0x71a17c],0x0

mov dword [dword 0x71a180],0x0

fld dword [dword 0x6051b0]
fstp dword [dword 0x71a184]
pusha
fld dword [dword 0x71a184]
fld dword [dword 0x71a180]
fld dword [dword 0x71a17c]
lea esi,[dword 0x71a08c]
call 0x44d110
fstp dword [dword 0x71a170]
fstp dword [dword 0x71a174]
fstp dword [dword 0x71a178]
popa
ret
