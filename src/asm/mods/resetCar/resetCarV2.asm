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
    je short resetCarInnerLoopInner ;Jump if the player to be compared is the same
    call 0x43f0df
    jc short resetCarInnerLoop2  ;Jump if its a dangerous position
    cmp esi, 0x71630c
    ja short resetCarInnerLoopInner ;Jump to check other cars
    jmp short finishingResetCar ;Safe position to reset

resetCarInnerLoop2:
    neg dword [dword 0x614c4c]   ;Invert offset position
    mov eax,[0x6365e4]           ;Get currentCarTrackPosition
    add eax,[dword 0x614c4c]     ;Add both positions
    mov [0x614c50],eax           ;Update resetCarPosition
    mov esi, 0x70E40C            ;Base address of players (0x70F3EC) - sizeOf PlayerConfig, ptrplayerConfig[-1] 

resetCarInnerLoop2Inner:
    add esi, 0xFE0
    cmp ebx, esi 
    je short resetCarInnerLoop2Inner
    call 0x43f0df
    jc short resetCarInnerLoop3
    cmp esi, 0x71630c
    ja short resetCarInnerLoop2Inner
    jmp short finishingResetCar

resetCarInnerLoop3:
    neg dword [dword 0x614c4c]              ;Invert offset to positive again
    inc dword [dword 0x614c4c]              ;Add to increase the distance
    cmp dword [dword 0x614c4c],byte +0x40   ;If the distance is 64:
    jnz near resetCarInnerLoop              ;Do not jump to the start of the loop to check the players again
    pusha
    lea eax,[dword 0x4dbb01]
    call 0x40142b                            ;Call log line to wait a second
    popa
    sub dword [dword 0x71a1c0],byte +0x64    ;Add a second to the time for reset
    popa
    ret

finishingResetCar:
    mov eax,[0x614c50]
    mov [0x6365e4],eax                       ;Store resetCarPosition to currentCarTrackPosition
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