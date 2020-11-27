package xj.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import xj.ecommerce.entity.ProductCategory;

@CrossOrigin
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}