<template>
  <div class="home__wrapper" v-if="!LOADING_STATE">
    <div class="row">
      <div class="col">
        <q-card
          class="flex justify-between q-pa-md"
          style="width: 100%"
          flat
          bordered
        >
          <div>
            <span>{{ t('home.filter.label') }}</span>
          </div>

          <QcButton
            :label="t('home.filter.filter')"
            color="primary"
            size="md"
            icon="filter_alt"
            :loading="loadingBtn"
            @click.capture="loadingBtn = !loadingBtn"
          />
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <QcDatatable
          ref="test"
          :loading="loadingTable"
          selection="multiple"
          :columns="columns"
          :rows="rows"
          :flat="true"
          :bordered="true"
          :showSearch="true"
          :showCsv="true"
          :dense="true"
          :searchPlaceholder="t('home.table.search')"
          :allLabel="translates.table.allLabel"
          :recordsPerPage="translates.table.recordsPerPage"
          :failCsv="translates.table.failCsv"
          :csvLabel="t('home.table.csv')"
          @getEvent="onRequest($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import pinia from '@/main';
// VUE
import { computed, onMounted, ref, Ref } from 'vue';

// SERVICE
import { example } from '@/services/index';

// DESIGN SYSTEM
import { QcButton, QcDatatable } from '@denisibanez/design-system-ui';

// STORE
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading/loading.store';
import { useSnackbarStore } from '@/stores/snackbar/snackbar.store';

// TYPES
import QcSnackbarInterface from '@/stores/snackbar/snackbar';

// LIBS
import { useI18n } from 'vue-i18n';

// VARIABLES
const { LOADING_DISPATCH } = useLoadingStore(pinia);
const { SNACKBAR_DISPATCH } = useSnackbarStore(pinia);
const { LOADING_STATE } = storeToRefs(useLoadingStore(pinia));

const loadingBtn: Ref<boolean> = ref(false);
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const test = ref();
const loadingTable = ref(false);

const translates: any = {
  table: {
    desserts: computed(() => t('home.table.headers.dessert')),
    calories: computed(() => t('home.table.headers.calories')),
    fat: computed(() => t('home.table.headers.fat')),
    carbs: computed(() => t('home.table.headers.carbs')),
    protein: computed(() => t('home.table.headers.protein')),
    sodium: computed(() => t('home.table.headers.sodium')),
    calcium: computed(() => t('home.table.headers.calcium')),
    iron: computed(() => t('home.table.headers.iron')),
    allLabel: computed(() => t('home.table.pagination.allRecords')),
    recordsPerPage: computed(() => t('home.table.pagination.recordsPerPage')),
    failCsv: computed(() => t('home.table.failCsv')),
  },
};

const columns: any = ref([
  {
    name: 'name',
    required: true,
    label: translates.table.desserts,
    align: 'left',
    field: (row: any) => row.name,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: translates.table.calories,
    field: 'calories',
    sortable: true,
  },
  {
    name: 'fat',
    label: translates.table.fat,
    field: 'fat',
    sortable: true,
    style: 'width: 10px',
  },
  { name: 'carbs', label: translates.table.carbs, field: 'carbs' },
  { name: 'protein', label: translates.table.protein, field: 'protein' },
  { name: 'sodium', label: translates.table.sodium, field: 'sodium' },
  {
    name: 'calcium',
    label: translates.table.calcium,
    field: 'calcium',
    sortable: true,
  },
  {
    name: 'iron',
    label: translates.table.iron,
    field: 'iron',
    sortable: true,
  },
]);

let rows: any = ref([]);

// LIFECYCLE
onMounted(() => {
  getExample();
  console.log(translates);
});

// METHODS
async function getExample() {
  const payload = {};

  LOADING_DISPATCH(true);
  await example.getExample(
    payload,
    (response: any) => {
      console.log(response.data, 'SUCCESS');
      SNACKBAR_DISPATCH({
        model: true,
        closeLabel: t('login.form.close'),
        bgColor: 'positive',
        text: 'Sucesso no request!',
        icon: 'check_circle',
        actionLabelColor: 'white',
        textColor: 'white',
      } as QcSnackbarInterface);
    },
    (e: any) => {
      console.log(e, 'ERROR');
      SNACKBAR_DISPATCH({
        model: true,
        closeLabel: t('login.form.close'),
        bgColor: 'negative',
        text: 'Erro no request!',
        icon: 'warning',
        actionLabelColor: 'white',
        textColor: 'white',
      } as QcSnackbarInterface);
    },
    () => {
      console.log('DONE');
      LOADING_DISPATCH(false);
    }
  );
}

function onRequest($event: any) {
  const { page, rowsPerPage, sortBy, descending, filter } = $event.pagination;
  const payload = {
    page,
    rowsPerPage,
  };
  loadingTable.value = true;

  example.postExample(
    payload,
    (response: any) => {
      console.log(response.data, 'SUCCESS');
      const returnedData = [
        {
          id: 1,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          id: 2,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          id: 3,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          id: 4,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
        {
          id: 5,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
        },
        {
          id: 5,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
        },
        {
          id: 7,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
        },
      ];

      rows.value = [...returnedData];

      test.value.tableRef.pagination.page = page;
      test.value.tableRef.pagination.rowsPerPage = 5;
      test.value.tableRef.pagination.sortBy = sortBy;
      test.value.tableRef.pagination.descending = descending;
      test.value.tableRef.pagination.rowsNumber = 15;
    },
    (e: any) => {
      console.log(e, 'ERROR');
      SNACKBAR_DISPATCH({
        model: true,
        closeLabel: t('login.form.close'),
        bgColor: 'negative',
        text: 'Erro no request!',
        icon: 'warning',
        actionLabelColor: 'white',
        textColor: 'white',
      } as QcSnackbarInterface);
    },
    () => {
      loadingTable.value = false;
    }
  );
}
</script>
