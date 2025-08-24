import css from './Filters.module.css';
import Icon from '../Icon/Icon';
// import Button from '../Button/Button';
import { Form, Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/filtersSlice.js';
import { clearItems } from '../../redux/campers/slice.js';

const Filters = () => {
    const dispatch = useDispatch();

    const initialValues = {
        location: '',
        equipment: {
            AC: false,
            TV: false,
            kitchen: false,
            bathroom: false,
            refrigerator: false,
            microwave: false,
            gas: false,
            water: false,
            engine: '',
            transmission: '',
        },
        type: '',
    };
    const chooseTransmission = [
        { value: 'automatic', label: "Automatic" },
        { value: 'manual', label: "Manual" },
        { value: '', label: 'Automatic' }
    ];

    const chooseEngine = [
        { value: 'petrol', label: "Petrol" },
        { value: 'diesel', label: "Diesel" },
        { value: 'hybrid', label: "Hybrid" },
        { value: '', label: "Petrol" },
    ];

    const CustomButtonSelectTransmission = ({ field, form, options }) => {
        const currentOptionIndex = options.findIndex(
            option => option.value === field.value
        );
        const handleClickTransmission = () => {
            const prevIndex = (currentOptionIndex + 1) % options.length;
            form.setFieldValue(field.name, options[prevIndex].value);
        };

        const currentLabel = options[currentOptionIndex]?.label || "Choose";
        return (
            <button type='button' onClick={handleClickTransmission} className={css.btnFilter}>{currentLabel}</button>
        );
    };

  const handleSubmit = values => {
  
        const arr = [];
      values.location && arr.push(`location=${values.location}`);
      
        values.type && arr.push(`form=${values.type}`);

        const query = Object.fromEntries(
            Object.entries(values.equipment).filter(
                ([, values]) => (values !== false) & (values !== '')
            )
        );

        const queryString = new URLSearchParams(query).toString() + '&' + arr.join('&');
    dispatch(changeFilter(queryString));
    
        dispatch(clearItems([]))
    };
  return (
    <div className={css.mainContainer}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className={css.container}>
            <label className={css.label}>
              Location
              <div className={css.iconContainer}>
                <span className={css.icon}>
                  <Icon id="icon-Map" width={16} height={16} />
                </span>
                <Field
                  type="text"
                  name="location"
                  className={css.input}
                  placeholder="City"
                />
              </div>
            </label>
            <p className={css.text}>Filters</p>
            <div id="checkbox-group" className={css.subTitle}>
              Vehicle Equipment
            </div>
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className={css.filtersBox}
            >
              <label className={values.equipment.AC ? css.active : undefined}>
                <Field type="checkbox" name="equipment.AC" />
                <Icon id="icon-AC" width={32} height={32} />
                AC
              </label>
              <label
                className={
                  values.equipment.transmission ? css.active : undefined
                }
              >
                <Icon id="icon-diagram" width={32} height={32} />
                <Field name="equipment.transmission">
                  {({ field, form }) => (
                    <CustomButtonSelectTransmission
                      field={field}
                      form={form}
                      options={chooseTransmission}
                    />
                  )}
                </Field>
              </label>
              <label
                className={values.equipment.kitchen ? css.active : undefined}
              >
                <Field type="checkbox" name="equipment.kitchen" />
                <Icon id="icon-kitchen" width={32} height={32} />
                Kitchen
              </label>
              <label className={values.equipment.TV ? css.active : undefined}>
                <Field type="checkbox" name="equipment.TV" />
                <Icon id="icon-tv" width={32} height={32} />
                TV
              </label>
              <label
                className={values.equipment.bathroom ? css.active : undefined}
              >
                <Field type="checkbox" name="equipment.bathroom" />
                <Icon id="icon_shower" width={32} height={32} />
                Bathroom
              </label>

              <label
                className={values.equipment.engine ? css.active : undefined}
              >
                <Icon id="icon-Patrol" width={32} height={32} />
                <Field name="equipment.engine">
                  {({ field, form }) => (
                    <CustomButtonSelectTransmission
                      field={field}
                      form={form}
                      options={chooseEngine}
                    />
                  )}
                </Field>
              </label>
              <label
                className={
                  values.equipment.refrigerator ? css.active : undefined
                }
              >
                <Field type="checkbox" name="equipment.refrigerator" />
                <Icon id="icon_fridge" width={32} height={32} />
                Refrigerator
              </label>
              <label
                className={values.equipment.microwave ? css.active : undefined}
              >
                <Field type="checkbox" name="equipment.microwave" />
                <Icon id="icon_microwave" width={32} height={32} />
                Microwave
              </label>

              <label className={values.equipment.gas ? css.active : undefined}>
                <Field type="checkbox" name="equipment.gas" />
                <Icon id="icon_gas" width={32} height={32} />
                Gas
              </label>

              <label
                className={values.equipment.water ? css.active : undefined}
              >
                <Field type="checkbox" name="equipment.water" />
                <Icon id="icon_water" width={32} height={32} />
                Water
              </label>
            </div>
            <div id="radio-group" className={css.subTitle}>
              Vehicle Type
            </div>
            <div
              role="group"
              aria-labelledby="radio-group"
              className={css.filtersBox}
            >
              <label
                className={
                  values.type === "panelTruck" ? css.active : undefined
                }
              >
                <Field
                  type="radio"
                  name="type"
                  value="panelTruck"
                  onClick={() => {
                    if (values.type === "panelTruck") {
                      setFieldValue("type", "");
                    } else {
                      setFieldValue("type", "panelTruck");
                    }
                  }}
                />
                <Icon id="icon-bi_grid-1x2" width={32} height={32} />
                Van
              </label>

              <label
                className={
                  values.type === "fullyIntegrated" ? css.active : undefined
                }
              >
                <Field
                  type="radio"
                  name="type"
                  value="fullyIntegrated"
                  onClick={() => {
                    if (values.type === "fullyIntegrated") {
                      setFieldValue("type", "");
                    } else {
                      setFieldValue("type", "fullyIntegrated");
                    }
                  }}
                />
                <Icon id="icon-bi_grid" width={32} height={32} />
                Fully Integrated
              </label>

              <label
                className={values.type === "alcove" ? css.active : undefined}
              >
                <Field
                  type="radio"
                  name="type"
                  value="panelTruck"
                  onClick={() => {
                    if (values.type === "alcove") {
                      setFieldValue("type", "");
                    } else {
                      setFieldValue("type", "alcove");
                    }
                  }}
                />
                <Icon id="icon-bi_grid-3x3-gap" width={32} height={32} />
                Alcove
              </label>
            </div>
            <button type="submit" className={css.btn} >
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default Filters