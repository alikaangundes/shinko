import type { Schema, Struct } from '@strapi/strapi';

export interface ContactContactDetail extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_details';
  info: {
    description: '\u0130leti\u015Fim bilgi kart\u0131';
    displayName: 'Contact Detail';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CorporateFeatureSection extends Struct.ComponentSchema {
  collectionName: 'components_corporate_feature_sections';
  info: {
    description: 'Misyon, vizyon ve \u00E7evre politikas\u0131 alan\u0131';
    displayName: 'Corporate Feature Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    points: Schema.Attribute.Component<'shared.text-item', true>;
    secondaryBody: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHighlightCard extends Struct.ComponentSchema {
  collectionName: 'components_home_highlight_cards';
  info: {
    description: 'Anasayfa sekt\u00F6r/kalite b\u00FCy\u00FCk kart\u0131';
    displayName: 'Highlight Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    iconKey: Schema.Attribute.Enumeration<['car', 'shield']> &
      Schema.Attribute.DefaultTo<'car'>;
    image: Schema.Attribute.Media<'images'>;
    linkHref: Schema.Attribute.String;
    linkLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeProductionFeature extends Struct.ComponentSchema {
  collectionName: 'components_home_production_features';
  info: {
    description: 'Anasayfa \u00FCretim teknolojisi kart\u0131';
    displayName: 'Production Feature';
  };
  attributes: {
    body: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeProductionStat extends Struct.ComponentSchema {
  collectionName: 'components_home_production_stats';
  info: {
    description: 'Anasayfa \u00FCretim istatisti\u011Fi';
    displayName: 'Production Stat';
  };
  attributes: {
    iconKey: Schema.Attribute.Enumeration<
      ['machine', 'tonnage', 'building', 'team']
    > &
      Schema.Attribute.DefaultTo<'machine'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface HomeSectorSolutionCard extends Struct.ComponentSchema {
  collectionName: 'components_home_sector_solution_cards';
  info: {
    description: 'Anasayfa sekt\u00F6rel \u00E7\u00F6z\u00FCm kart\u0131';
    displayName: 'Sector Solution Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    dotColor: Schema.Attribute.String;
    featureColor: Schema.Attribute.String;
    features: Schema.Attribute.Component<'shared.text-item', true>;
    gradient: Schema.Attribute.String;
    href: Schema.Attribute.String;
    iconKey: Schema.Attribute.Enumeration<
      ['car', 'electric', 'appliance', 'garden', 'box']
    > &
      Schema.Attribute.DefaultTo<'box'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HrInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_hr_info_cards';
  info: {
    description: '\u0130nsan kaynaklar\u0131 bilgi kart\u0131';
    displayName: 'HR Info Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductionErpCard extends Struct.ComponentSchema {
  collectionName: 'components_production_erp_cards';
  info: {
    description: 'ERP \u00E7\u00F6z\u00FCm kart\u0131';
    displayName: 'ERP Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductionErpTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_production_erp_text_blocks';
  info: {
    description: 'ERP a\u00E7\u0131klama kutusu';
    displayName: 'ERP Text Block';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductionMachineCard extends Struct.ComponentSchema {
  collectionName: 'components_production_machine_cards';
  info: {
    description: '\u00DCretim makine parkuru kart\u0131';
    displayName: 'Machine Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductionMachineGroup extends Struct.ComponentSchema {
  collectionName: 'components_production_machine_groups';
  info: {
    description: 'Makine tonaj grubu';
    displayName: 'Machine Group';
  };
  attributes: {
    count: Schema.Attribute.Integer & Schema.Attribute.Required;
    description: Schema.Attribute.String;
    maxTonnage: Schema.Attribute.Integer & Schema.Attribute.Required;
    minTonnage: Schema.Attribute.Integer & Schema.Attribute.Required;
    percent: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface ProductionSectorCard extends Struct.ComponentSchema {
  collectionName: 'components_production_sector_cards';
  info: {
    description: 'Sekt\u00F6rel \u00E7\u00F6z\u00FCm kart\u0131';
    displayName: 'Sector Card';
  };
  attributes: {
    accentColor: Schema.Attribute.String;
    anchorId: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'shared.text-item', true>;
    gradient: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductionToolingMachine extends Struct.ComponentSchema {
  collectionName: 'components_production_tooling_machines';
  info: {
    description: 'Kal\u0131phane makine ad\u0131';
    displayName: 'Tooling Machine';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface QualityCertificate extends Struct.ComponentSchema {
  collectionName: 'components_quality_certificates';
  info: {
    description: 'Kalite sertifikas\u0131';
    displayName: 'Certificate';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface QualityDevice extends Struct.ComponentSchema {
  collectionName: 'components_quality_devices';
  info: {
    description: 'Kalite cihaz\u0131';
    displayName: 'Quality Device';
  };
  attributes: {
    brand: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface QualityMetric extends Struct.ComponentSchema {
  collectionName: 'components_quality_metrics';
  info: {
    description: 'Kalite video alan\u0131 k\u00FC\u00E7\u00FCk kutusu';
    displayName: 'Quality Metric';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface QualityPolicyItem extends Struct.ComponentSchema {
  collectionName: 'components_quality_policy_items';
  info: {
    description: 'Kalite politikas\u0131 maddesi';
    displayName: 'Quality Policy Item';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPageHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_heroes';
  info: {
    description: 'Sayfa \u00FCst alan\u0131';
    displayName: 'Page Hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    description: 'Tek sat\u0131r metin';
    displayName: 'Text Item';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.contact-detail': ContactContactDetail;
      'corporate.feature-section': CorporateFeatureSection;
      'home.highlight-card': HomeHighlightCard;
      'home.production-feature': HomeProductionFeature;
      'home.production-stat': HomeProductionStat;
      'home.sector-solution-card': HomeSectorSolutionCard;
      'hr.info-card': HrInfoCard;
      'production.erp-card': ProductionErpCard;
      'production.erp-text-block': ProductionErpTextBlock;
      'production.machine-card': ProductionMachineCard;
      'production.machine-group': ProductionMachineGroup;
      'production.sector-card': ProductionSectorCard;
      'production.tooling-machine': ProductionToolingMachine;
      'quality.certificate': QualityCertificate;
      'quality.device': QualityDevice;
      'quality.metric': QualityMetric;
      'quality.policy-item': QualityPolicyItem;
      'shared.page-hero': SharedPageHero;
      'shared.text-item': SharedTextItem;
    }
  }
}
