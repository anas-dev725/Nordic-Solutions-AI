/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'da' | 'en';
export type Theme = 'sand' | 'slate' | 'sage';

export interface ServiceDetail {
  id: string;
  titleDa: string;
  titleEn: string;
  descDa: string;
  descEn: string;
  iconName: string;
  benefitsDa: string[];
  benefitsEn: string[];
}

export interface CRMLead {
  id: string;
  name: string;
  company: string;
  stage: 'lead' | 'contacted' | 'analyzed' | 'scheduled';
  value: number;
  score: number;
  phone: string;
  summaryDa: string;
  summaryEn: string;
}

export interface WorkflowNode {
  id: string;
  titleDa: string;
  titleEn: string;
  status: 'idle' | 'active' | 'completed';
  type: 'trigger' | 'action' | 'condition' | 'ai';
  icon: string;
  duration: number;
}

export interface RoiMetrics {
  employeeCount: number;
  averageMonthlyWage: number;
  manualHoursPerWeek: number;
  automationPotential: number; // percentage (e.g. 70)
}
