<script setup lang="ts">
import HeroSlider from '@/components/home/HeroSlider.vue'
import QuickAccess from '@/components/home/QuickAccess.vue'
import StructureSection from '@/components/home/StructureSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import AdvantagesSection from '@/components/home/AdvantagesSection.vue'
import LatestNewsSection from '@/components/home/LatestNewsSection.vue'
import OfficialResourcesSection from '@/components/home/OfficialResourcesSection.vue'
import PatientInfoSection from '@/components/home/PatientInfoSection.vue'
</script>

<template>
  <div>
    <HeroSlider />
    <QuickAccess />
    <StructureSection />
    <ServicesSection />
    <AdvantagesSection />
    <LatestNewsSection />
    <OfficialResourcesSection />
    <PatientInfoSection />
  </div>
</template>
