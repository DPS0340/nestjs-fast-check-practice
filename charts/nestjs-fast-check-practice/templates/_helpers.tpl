{{/*
Expand the name of the chart.
*/}}
{{- define "nestjs-fast-check-practice.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "nestjs-fast-check-practice.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "nestjs-fast-check-practice.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "nestjs-fast-check-practice.labels" -}}
helm.sh/chart: {{ include "nestjs-fast-check-practice.chart" . }}
{{ include "nestjs-fast-check-practice.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "nestjs-fast-check-practice.selectorLabels" -}}
app.kubernetes.io/name: {{ include "nestjs-fast-check-practice.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels (Database)
*/}}
{{- define "nestjs-fast-check-practice.database.labels" -}}
helm.sh/chart: {{ include "nestjs-fast-check-practice.chart" . }}
{{ include "nestjs-fast-check-practice.database.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}


{{/*
Selector labels (Database)
*/}}
{{- define "nestjs-fast-check-practice.database.selectorLabels" -}}
app.kubernetes.io/name: {{ include "nestjs-fast-check-practice.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}-database
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "nestjs-fast-check-practice.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "nestjs-fast-check-practice.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
