import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface NauticalMotionSceneProps {
  className?: string
}

export function NauticalMotionScene({ className = '' }: NauticalMotionSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasReducedMotion, setHasReducedMotion] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Verifica acessibilidade de movimento reduzido
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setHasReducedMotion(motionQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', handleMotionChange)

    // Determina se o tema escuro está ativo
    let isDark = document.documentElement.classList.contains('dark')

    // 1. Cena e Câmera
    const scene = new THREE.Scene()
    const width = container.clientWidth || 600
    const height = container.clientHeight || 280

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 1.6, 4.4)
    camera.lookAt(0, 0.3, 0)

    // 2. Renderizador WebGL
    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      // Caso o dispositivo não suporte WebGL, encerra sem quebrar
      return
    }

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)
    renderer.domElement.className = 'w-full h-full block pointer-events-none'

    // Coleção para descarte correto de memória
    const disposables: { dispose: () => void }[] = []
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item)
      return item
    }

    // 3. Luzes
    const ambientLight = track(
      new THREE.AmbientLight(isDark ? 0x1e293b : 0xe0f2fe, isDark ? 0.9 : 1.3),
    )
    scene.add(ambientLight)

    const dirLight = track(
      new THREE.DirectionalLight(isDark ? 0x93c5fd : 0xfff7ed, isDark ? 1.4 : 2.2),
    )
    dirLight.position.set(4, 7, 5)
    scene.add(dirLight)

    const lanternLight = track(
      new THREE.PointLight(0xf59e0b, isDark ? 2.5 : 1.0, 4.5),
    )
    lanternLight.position.set(0.15, 0.7, 0.2)
    scene.add(lanternLight)

    // 4. Mar Tridimensional (Ondas)
    const waveWidth = 18
    const waveDepth = 10
    const waveSegmentsW = 44
    const waveSegmentsD = 26
    const waveGeo = track(
      new THREE.PlaneGeometry(waveWidth, waveDepth, waveSegmentsW, waveSegmentsD),
    )
    waveGeo.rotateX(-Math.PI / 2)
    waveGeo.translate(0, -0.15, 0.2)

    const initialPos = waveGeo.getAttribute('position') as THREE.BufferAttribute
    const origPos = initialPos.clone()

    const waveMaterial = track(
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x0c2545 : 0x38bdf8,
        emissive: isDark ? 0x1e3a8a : 0xbae6fd,
        emissiveIntensity: isDark ? 0.35 : 0.15,
        roughness: 0.18,
        metalness: 0.25,
        transparent: true,
        opacity: isDark ? 0.8 : 0.65,
        flatShading: false,
      }),
    )

    const waveMesh = new THREE.Mesh(waveGeo, waveMaterial)
    scene.add(waveMesh)

    // 5. Barquinho a Vela Náutico Estilizado
    const boat = new THREE.Group()

    // Casco Náutico
    const hullShape = new THREE.Shape()
    hullShape.moveTo(0, 1.25)
    hullShape.quadraticCurveTo(0.48, 0.6, 0.44, -0.9)
    hullShape.lineTo(-0.44, -0.9)
    hullShape.quadraticCurveTo(-0.48, 0.6, 0, 1.25)

    const hullGeo = track(
      new THREE.ExtrudeGeometry(hullShape, {
        depth: 0.44,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.06,
        bevelThickness: 0.06,
      }),
    )
    hullGeo.rotateZ(-Math.PI / 2)
    hullGeo.rotateX(Math.PI / 2)
    hullGeo.center()

    const hullMaterial = track(
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e3a8a : 0x0c1e40, // Azul marinho náutico
        roughness: 0.3,
        metalness: 0.1,
      }),
    )
    const hullMesh = new THREE.Mesh(hullGeo, hullMaterial)
    boat.add(hullMesh)

    // Convés de Madeira
    const deckGeo = track(new THREE.BoxGeometry(2.1, 0.06, 0.85))
    const deckMaterial = track(
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0xfef3c7, // Carvalho/Marfim náutico
        roughness: 0.6,
      }),
    )
    const deckMesh = new THREE.Mesh(deckGeo, deckMaterial)
    deckMesh.position.set(0, 0.23, 0)
    boat.add(deckMesh)

    // Cabine Náutica
    const cabinGeo = track(new THREE.BoxGeometry(0.65, 0.24, 0.5))
    const cabinMaterial = track(
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x0f172a : 0xffffff,
        roughness: 0.3,
      }),
    )
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMaterial)
    cabinMesh.position.set(-0.35, 0.38, 0)
    boat.add(cabinMesh)

    // Mastro
    const mastGeo = track(new THREE.CylinderGeometry(0.035, 0.045, 1.9, 16))
    const mastMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xd97706, // Madeira dourada náutica
        roughness: 0.35,
        metalness: 0.2,
      }),
    )
    const mastMesh = new THREE.Mesh(mastGeo, mastMaterial)
    mastMesh.position.set(0.15, 1.15, 0)
    boat.add(mastMesh)

    // Retranca (Boom)
    const boomGeo = track(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 10))
    boomGeo.rotateZ(Math.PI / 2)
    const boomMesh = new THREE.Mesh(boomGeo, mastMaterial)
    boomMesh.position.set(-0.35, 0.38, 0.02)
    boat.add(boomMesh)

    // Vela Principal Curvada (Mainsail)
    const mainSailGeo = track(new THREE.BufferGeometry())
    const uSegs = 4
    const vSegs = 6
    const sailPositions: number[] = []
    const sailIndices: number[] = []
    const sailUvs: number[] = []

    for (let j = 0; j <= vSegs; j++) {
      const v = j / vSegs
      for (let i = 0; i <= uSegs; i++) {
        const u = i / uSegs
        const chord = (1 - v * 0.94) * 0.92
        const px = 0.15 - u * chord
        const py = 0.38 + v * 1.45
        const billow = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * 0.16
        sailPositions.push(px, py, billow)
        sailUvs.push(u, v)
      }
    }
    for (let j = 0; j < vSegs; j++) {
      for (let i = 0; i < uSegs; i++) {
        const a = j * (uSegs + 1) + i
        const b = a + 1
        const c = (j + 1) * (uSegs + 1) + i
        const d = c + 1
        sailIndices.push(a, b, c)
        sailIndices.push(b, d, c)
      }
    }
    mainSailGeo.setAttribute('position', new THREE.Float32BufferAttribute(sailPositions, 3))
    mainSailGeo.setAttribute('uv', new THREE.Float32BufferAttribute(sailUvs, 2))
    mainSailGeo.setIndex(sailIndices)
    mainSailGeo.computeVertexNormals()

    const sailMaterial = track(
      new THREE.MeshStandardMaterial({
        color: isDark ? 0xf8fafc : 0xffffff,
        roughness: 0.45,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    )
    const mainSailMesh = new THREE.Mesh(mainSailGeo, sailMaterial)
    boat.add(mainSailMesh)

    // Vela de Proa (Jib)
    const jibSailGeo = track(new THREE.BufferGeometry())
    const jibPos: number[] = []
    const jibIndices: number[] = []
    const jibUvs: number[] = []

    for (let j = 0; j <= vSegs; j++) {
      const v = j / vSegs
      for (let i = 0; i <= uSegs; i++) {
        const u = i / uSegs
        const stayX = THREE.MathUtils.lerp(0.9, 0.18, v)
        const stayY = THREE.MathUtils.lerp(0.38, 1.6, v)
        const clewX = 0.25
        const clewY = 0.45
        const px = THREE.MathUtils.lerp(stayX, clewX, u)
        const py = THREE.MathUtils.lerp(stayY, clewY, u)
        const billow = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * 0.12
        jibPos.push(px, py, billow)
        jibUvs.push(u, v)
      }
    }
    for (let j = 0; j < vSegs; j++) {
      for (let i = 0; i < uSegs; i++) {
        const a = j * (uSegs + 1) + i
        const b = a + 1
        const c = (j + 1) * (uSegs + 1) + i
        const d = c + 1
        jibIndices.push(a, b, c)
        jibIndices.push(b, d, c)
      }
    }
    jibSailGeo.setAttribute('position', new THREE.Float32BufferAttribute(jibPos, 3))
    jibSailGeo.setAttribute('uv', new THREE.Float32BufferAttribute(jibUvs, 2))
    jibSailGeo.setIndex(jibIndices)
    jibSailGeo.computeVertexNormals()

    const jibMesh = new THREE.Mesh(jibSailGeo, sailMaterial)
    boat.add(jibMesh)

    // Flâmula Dourada no Topo do Mastro
    const pennantShape = new THREE.Shape()
    pennantShape.moveTo(0.15, 2.1)
    pennantShape.lineTo(0.15, 1.95)
    pennantShape.lineTo(-0.3, 2.02)
    pennantShape.closePath()
    const pennantGeo = track(new THREE.ShapeGeometry(pennantShape))
    const pennantMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Âmbar náutico dourado
        roughness: 0.3,
        side: THREE.DoubleSide,
      }),
    )
    const pennantMesh = new THREE.Mesh(pennantGeo, pennantMaterial)
    boat.add(pennantMesh)

    // Boia Salva-Vidas na Borda
    const buoyGeo = track(new THREE.TorusGeometry(0.11, 0.035, 12, 24))
    const buoyMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
      }),
    )
    const buoyMesh = new THREE.Mesh(buoyGeo, buoyMaterial)
    buoyMesh.position.set(-0.2, 0.32, 0.44)
    boat.add(buoyMesh)

    // Lanterna Náutica Dourada no Mastro
    const lanternGeo = track(new THREE.CylinderGeometry(0.04, 0.05, 0.09, 8))
    const lanternMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      }),
    )
    const lanternMesh = new THREE.Mesh(lanternGeo, lanternMaterial)
    lanternMesh.position.set(0.15, 0.85, 0.12)
    boat.add(lanternMesh)

    // Timão 3D Náutico de Ouro Polido
    const helmGroup = new THREE.Group()
    const rimGeo = track(new THREE.TorusGeometry(0.12, 0.02, 10, 24))
    const goldMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.85,
        roughness: 0.2,
      }),
    )
    const rimMesh = new THREE.Mesh(rimGeo, goldMaterial)
    helmGroup.add(rimMesh)

    const hubGeo = track(new THREE.CylinderGeometry(0.035, 0.035, 0.04, 16))
    hubGeo.rotateX(Math.PI / 2)
    const hubMesh = new THREE.Mesh(hubGeo, goldMaterial)
    helmGroup.add(hubMesh)

    // Raios do Timão
    for (let r = 0; r < 6; r++) {
      const spokeGeo = track(new THREE.CylinderGeometry(0.008, 0.008, 0.24, 8))
      spokeGeo.rotateZ((r * Math.PI) / 3)
      const spokeMesh = new THREE.Mesh(spokeGeo, goldMaterial)
      helmGroup.add(spokeMesh)
    }

    helmGroup.position.set(-0.75, 0.44, 0)
    helmGroup.rotation.y = -Math.PI / 2
    boat.add(helmGroup)

    // Ajusta a escala e adiciona o barco à cena
    boat.scale.set(0.85, 0.85, 0.85)
    scene.add(boat)

    // 6. Partículas Náuticas (Espuma, Brilhos e Estrelas de Navegação)
    const particleCount = 75
    const particleGeo = track(new THREE.BufferGeometry())
    const particlePos = new Float32Array(particleCount * 3)

    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 14
      particlePos[p * 3 + 1] = Math.random() * 3.5 - 0.5
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 8
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))

    const particleMaterial = track(
      new THREE.PointsMaterial({
        size: isDark ? 0.06 : 0.045,
        color: isDark ? 0x93c5fd : 0xf59e0b,
        transparent: true,
        opacity: isDark ? 0.85 : 0.55,
      }),
    )
    const particles = new THREE.Points(particleGeo, particleMaterial)
    scene.add(particles)

    // 7. Interação com o Mouse / Toque
    const mouse = { x: 0, y: 0 }
    const smoothMouse = { x: 0, y: 0 }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0
      let clientY = 0

      if ('touches' in e) {
        const touch = e.touches[0]
        if (touch) {
          clientX = touch.clientX
          clientY = touch.clientY
        }
      } else if ('clientX' in e) {
        clientX = e.clientX
        clientY = e.clientY
      }

      mouse.x = (clientX / window.innerWidth) * 2 - 1
      mouse.y = -(clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })

    // 8. Observador de Mudança de Tema (Claro / Escuro)
    const applyThemeColors = (dark: boolean) => {
      ambientLight.color.setHex(dark ? 0x1e293b : 0xe0f2fe)
      ambientLight.intensity = dark ? 0.9 : 1.3

      dirLight.color.setHex(dark ? 0x93c5fd : 0xfff7ed)
      dirLight.intensity = dark ? 1.4 : 2.2

      lanternLight.intensity = dark ? 2.5 : 1.0

      waveMaterial.color.setHex(dark ? 0x0c2545 : 0x38bdf8)
      waveMaterial.emissive.setHex(dark ? 0x1e3a8a : 0xbae6fd)
      waveMaterial.emissiveIntensity = dark ? 0.35 : 0.15
      waveMaterial.opacity = dark ? 0.8 : 0.65

      hullMaterial.color.setHex(dark ? 0x1e3a8a : 0x0c1e40)
      deckMaterial.color.setHex(dark ? 0x1e293b : 0xfef3c7)
      cabinMaterial.color.setHex(dark ? 0x0f172a : 0xffffff)
      sailMaterial.color.setHex(dark ? 0xf8fafc : 0xffffff)

      particleMaterial.color.setHex(dark ? 0x93c5fd : 0xf59e0b)
      particleMaterial.opacity = dark ? 0.85 : 0.55
      particleMaterial.size = dark ? 0.06 : 0.045
    }

    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains('dark')
      if (currentDark !== isDark) {
        isDark = currentDark
        applyThemeColors(isDark)
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // 9. Redimensionamento Responsivo
    const handleResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth || 600
      const h = container.clientHeight || 280
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    window.addEventListener('resize', handleResize)

    // 10. Loop de Animação e Cinemática das Ondas
    let animationFrameId = 0
    let lastTime = performance.now()
    let elapsed = 0

    const getWaveElevation = (x: number, z: number, t: number) => {
      return (
        Math.sin(x * 0.7 + t * 2.0) * 0.11 +
        Math.cos(z * 0.9 + t * 1.5) * 0.08 +
        Math.sin((x + z) * 0.5 + t * 2.4) * 0.04
      )
    }

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = (currentTime - lastTime) * 0.001
      lastTime = currentTime

      // Se prefers-reduced-motion estiver ativo, desacelera significativamente o movimento
      const speed = motionQuery.matches ? 0.08 : 1.0
      elapsed += delta * speed

      // Interpolação suave do mouse (damping)
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04

      // Deformação das Ondas em Tempo Real
      const pos = waveGeo.getAttribute('position') as THREE.BufferAttribute
      const pCount = pos.count
      for (let i = 0; i < pCount; i++) {
        const ox = origPos.getX(i)
        const oz = origPos.getZ(i)
        const y = getWaveElevation(ox, oz, elapsed)
        pos.setY(i, y)
      }
      pos.needsUpdate = true
      waveGeo.computeVertexNormals()

      // Cinemática Hidrodinâmica do Barquinho (Heave, Pitch, Roll e Yaw)
      const boatX = 0
      const boatZ = 0
      const centerH = getWaveElevation(boatX, boatZ, elapsed)
      const bowH = getWaveElevation(boatX + 0.8, boatZ, elapsed)
      const sternH = getWaveElevation(boatX - 0.8, boatZ, elapsed)
      const portH = getWaveElevation(boatX, boatZ + 0.5, elapsed)
      const stbdH = getWaveElevation(boatX, boatZ - 0.5, elapsed)

      const pitch = Math.atan2(bowH - sternH, 1.6)
      const roll = Math.atan2(portH - stbdH, 1.0)

      boat.position.y = centerH + 0.05
      boat.rotation.z = -pitch + smoothMouse.x * 0.12
      boat.rotation.x = roll - smoothMouse.y * 0.1
      boat.rotation.y = Math.sin(elapsed * 0.7) * 0.07 + smoothMouse.x * 0.25

      // Rotação dinâmica do Timão de acordo com o rumo
      helmGroup.rotation.z = Math.sin(elapsed * 1.3) * 0.35 + smoothMouse.x * 1.1

      // Movimentação das partículas
      const partPosAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute
      const pArr = partPosAttr.array as Float32Array
      for (let p = 0; p < particleCount; p++) {
        const curY = pArr[p * 3 + 1] ?? 0
        const curX = pArr[p * 3] ?? 0
        pArr[p * 3 + 1] = curY + Math.sin(elapsed + p) * 0.002
        pArr[p * 3] = curX + 0.003
        if ((pArr[p * 3] ?? 0) > 7) {
          pArr[p * 3] = -7
        }
      }
      partPosAttr.needsUpdate = true

      // Efeito de Parallax da Câmera
      camera.position.x = smoothMouse.x * 0.4
      camera.position.y = 1.6 + smoothMouse.y * 0.2
      camera.lookAt(0, 0.35, 0)

      if (renderer) {
        renderer.render(scene, camera)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    // 11. Limpeza Completa e Descarte de Recursos
    return () => {
      cancelAnimationFrame(animationFrameId)
      motionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
      observer.disconnect()

      disposables.forEach((item) => {
        try {
          item.dispose()
        } catch {
          // ignora eventuais erros de descarte secundários
        }
      })

      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden select-none ${className}`}
      title={hasReducedMotion ? 'Cenário Náutico 3D (Modo calmo ativo)' : 'Cenário Náutico 3D'}
    />
  )
}
