# 사용예시
```tsx
<div>
  <ToastContainer pos="bottom-center" />
  <button onClick={() => toast.add('안녕하세요!', 'info', 3000)}>Show Toast</button>
</div>
```

# 요구사항

- [x] 이미 만들어진 Toast 라이브러리를 사용하지 않고 직접 개발하여야 한다.

- [x] Toast의 위치를 조절할 수 있는 기능을 포함하여야 한다. (top-left, top-center, top-right, bottom-left, bottom-right, bottom-center)

- [x] Toast의 autoClose 기능을 포함하여야 한다. Default delay는 3000ms이며 ms기준의 delay값을 입력받을 수 있게 하여야 한다. 단 delay가 null인 경우 autoClose 기능을 수행하지 않는다

- [x] Toast Message안에 Close Button이 존재한다.

- [x] showToastMessage 함수를 만들고 Button을 통해 실행 가능하도록 하여야 한다.

- [x] Toast Message에 마우스를 올려놓는 경우 autoClose delay를 일시 정지한다.

- [x] autoClose의 진행상태를 보여주는 Progress bar를 제공한다

- [x] Clear all Button을 제공한다.

- [x] Toast Message의 Status variation(Success, Warning, Error)을 제공한다.

# 테스트용 동영상


https://github.com/user-attachments/assets/4f83855d-9088-45b8-8c43-7c8b6fc333a0

