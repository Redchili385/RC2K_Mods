BITS 32
org 43EFEFh

resetCar:
    pusha
    mov eax,[0x71a070]  ;Use currentPlayer.trackPosition instead of validTrackPosition 
    mov [0x6365e4], eax ;Update currentCarTrackPosition
    mov eax,[dword 0x71b3F8]
    mov dword [0x4 * eax + 0x71BFA8], 0x0  ; => zero bot reverse gear counter
    mov ebx, [0x4 * eax + 0x71B3B8]   ;PlayerConfigAddresses, EBX = currentPlayerAddress
    mov dword [dword 0x614c4c],0x0  ;OffsetFromIdealResetTrackPosition?

resetCarInnerLoop:
    mov eax,[0x6365e4]
    add eax,[dword 0x614c4c]
    mov [0x614c50],eax
    mov esi, 0x70E40C     ;Base address of players (0x70F3EC) - sizeOf PlayerConfig, ptrplayerConfig[-1]             

resetCarInnerLoopInner:
    add esi, 0xFE0
    cmp ebx, esi     ;currentPlayerIndex
    je short resetCarInnerLoopInner
    call 0x43f0df
    jc short resetCarInnerLoop2
    cmp esi, 0x71630c
    ja short resetCarInnerLoopInner
    jmp short finishingResetCar

resetCarInnerLoop2:
    neg dword [dword 0x614c4c]
    mov eax,[0x6365e4]
    add eax,[dword 0x614c4c]
    mov [0x614c50],eax              ;Update resetCarPosition
    mov esi, 0x70E40C     ;Base address of players (0x70F3EC) - sizeOf PlayerConfig, ptrplayerConfig[-1] 

resetCarInnerLoop2Inner:
    add esi, 0xFE0
    cmp ebx, esi 
    je short resetCarInnerLoopInner
    call 0x43f0df
    jc short resetCarInnerLoop3
    cmp esi, 0x71630c
    ja short resetCarInnerLoopInner
    jmp short finishingResetCar

resetCarInnerLoop3:
    neg dword [dword 0x614c4c]
    inc dword [dword 0x614c4c]
    cmp dword [dword 0x614c4c],byte +0x40
    jnz near resetCarInnerLoop
    pusha
    lea eax,[dword 0x4dbb01]
    call 0x40142b
    popa
    sub dword [dword 0x71a1c0],byte +0x64
    popa
    ret

finishingResetCar:
    mov eax,[0x614c50]
    mov [0x6365e4],eax
    call 0x44666f
    call 0x43fb00
    mov dword [dword 0x71af84],0xa
    popa
    ret

nops:
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop
    nop