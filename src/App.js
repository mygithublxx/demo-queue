import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import Queue, { useQueue } from './queueOrigin.js';

const step1 = 'stpe1',
  step2 = 'stpe2',
  step3 = 'stpe3';

const Demo1 = ({queueRef}) => {
  const { register, next } = useQueue();
  const [open, setOpen] = useState(false)
  register(step1, () => {
    console.log('我是', step1);
    setOpen(true)
  });
  const next1 = () => {
    setOpen(false)
    next()
  }

  const onCancel = () => {
    setOpen(false)
    queueRef.current?.reset();
  }

  return <Modal title="这是step1" open={open} onCancel={onCancel} onOk={next1}>
  <div>这是step1</div>
</Modal>
};

const Demo2 = ({queueRef}) => {
  const { register, next } = useQueue();
  const [open, setOpen] = useState(false)
  register(step2, () => {
    console.log('我是', step2);
    setOpen(true)
  });
  const next2 = () => {
    setOpen(false)
    next()
  }
  const onCancel = () => {
    setOpen(false)
    queueRef.current?.reset();
  }
  return <Modal title="这是step2" open={open} onCancel={onCancel} onOk={next2}>
    <div>这是step2</div>
  </Modal>
};

const Demo3 = ({queueRef}) => {
  const { register, next } = useQueue();
  const [open, setOpen] = useState(false)
  register(step3, () => {
    console.log('我是', step3);
    setOpen(true)
  });
  const next3 = () => {
    setOpen(false)
    next()
  }
  const onCancel = () => {
    setOpen(false)
    queueRef.current?.reset();
  }

  return <Modal title="这是step2" open={open} onCancel={onCancel} onOk={next3}>
  <div>这是step3</div>
</Modal>
};

const App = () => {
  const queueRef = useRef();

  return (
    <Queue
      steps={[step1, step2, step3]}
      onFinish={() => {
        console.log('结束了~');
        queueRef.current?.reset();
      }}
      ref={queueRef}
    >
      <div style={{ display: 'flex', gap: 20 }}>
        <Button
          onClick={() => {
            console.log('开始执行');
            queueRef.current?.start();
          }}
        >
          点我开始
        </Button>
        <Demo1 queueRef={queueRef}/>
        <Demo2 queueRef={queueRef}/>
        <Demo3 queueRef={queueRef}/>
      </div>
    </Queue>
  );
};

export default App;