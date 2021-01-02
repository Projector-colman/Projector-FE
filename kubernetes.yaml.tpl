apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: projector-frontend
  name: projector-frontend
  namespace: projector
spec:
  selector:
    matchLabels:
      app: projector-frontend
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: projector-frontend
    spec:
      containers:
      - image: gcr.io/GOOGLE_CLOUD_PROJECT/projector-fe:COMMIT_SHA
        name: projector-fe
        ports:
        - containerPort: 80
          protocol: TCP
        resources:
          requests:
              memory: "50Mi"
              cpu: "50m"
          limits:
              memory: "250Mi"
              cpu: "250m"