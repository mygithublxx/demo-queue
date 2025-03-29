import React, {
    createContext,
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
  } from 'react';
  
  const QueueContext = createContext({
    next: () => {},
    register: () => {},
    context: false,
    finished: () => false,
  });
  
  const Queue = forwardRef(
    (
      { children, steps = [], onFinish },
      ref
    ) => {
      const queueRef = useRef({
        steps: [],
        callbacks: {},
      });
  
      const emitFinishEventRef = useRef(false);
      const startRef = useRef(false);
  
      useEffect(() => {
        queueRef.current.steps = steps?.slice();
        emitFinishEventRef.current = false;
        startRef.current = false;
      }, [JSON.stringify(steps)]);
  
      const next = () => {
        const { steps: allSteps, callbacks } = queueRef.current;
        if (allSteps.length === 0) {
          return console.warn('Queue is empty');
        }
        const name = allSteps.shift();
        if (!callbacks[name]) {
          console.warn(`No callback registered for step ${name}`);
          return next();
        }
        callbacks[name]?.();
        if (allSteps.length === 0 && !emitFinishEventRef.current) {
          onFinish?.();
          emitFinishEventRef.current = true;
        }
      };
  
      const start = () => {
        if (!startRef.current) {
          next();
          startRef.current = true;
        }
      };
  
      const ctxValue = useMemo(
        () => ({
          start,
          next: () => startRef.current && next(),
          register: (name, callback) => {
            queueRef.current.callbacks[name] = callback;
          },
          context: true,
          finished: () => queueRef.current.steps.length === 0,
        }),
        []
      );
  
      useImperativeHandle(ref, () => ({
        reset: () => {
          queueRef.current.steps = steps?.slice();
          emitFinishEventRef.current = false;
          startRef.current = false;
        },
        ...ctxValue,
      }));
  
      return (
        <QueueContext.Provider value={ctxValue}>{children}</QueueContext.Provider>
      );
    }
  );
  
  const useQueue = () => {
    const ctx = useContext(QueueContext);
    const errorRef = useRef(false);
  
    if (!ctx.context && !errorRef.current) {
      errorRef.current = true;
      console.error('useQueue must be used within a Queue component');
    }
    return ctx;
  };
  
  export default Queue;
  export { useQueue };